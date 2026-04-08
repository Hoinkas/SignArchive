import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { ITag, ITagAttached, ITagWord } from '../../../shared/models/tag.model'

export function listAllTags(): ITagAttached[] {
  return getDb().prepare('SELECT * FROM tag ORDER BY name').all() as ITagAttached[]
}

export function listTagsByWordId(wordId: string): ITagAttached[] {
  return getDb()
    .prepare(
      `SELECT tag.* FROM tag
       INNER JOIN tagWord ON tag.id = tagWord.tagId
       WHERE tagWord.wordId = ? ORDER BY tag.name`
    )
    .all(wordId) as ITagAttached[]
}

function findOrCreateTag(data: ITag): ITagAttached {
  const existing = getDb().prepare('SELECT * FROM tag WHERE name = ?').get(data.name) as
    | ITagAttached
    | undefined
  if (existing) return existing

  const tag: ITagAttached = { id: nanoid(), createdAt: Date.now(), name: data.name }
  getDb()
    .prepare('INSERT OR IGNORE INTO tag (id, createdAt, name) VALUES (@id, @createdAt, @name)')
    .run(tag)
  return tag
}

export function createTagAndLink(wordId: string, data: ITag): ITagAttached {
  const transaction = getDb().transaction(() => {
    const tag = findOrCreateTag(data)
    const link: ITagWord = { tagId: tag.id, wordId }
    getDb()
      .prepare('INSERT OR IGNORE INTO tagWord (tagId, wordId) VALUES (@tagId, @wordId)')
      .run(link)
    return tag
  })
  return transaction()
}

export function addAndRemoveTagsFromWord(
  tags: (ITag | ITagAttached)[],
  wordId: string
): ITagAttached[] {
  const existingTags = addManyTagsToWord(tags, wordId)
  const filteredTags = removeUnusedTagsFromWord(existingTags, wordId)

  return filteredTags
}

export function addManyTagsToWord(tags: (ITag | ITagAttached)[], wordId: string): ITagAttached[] {
  return tags.map((t) => createTagAndLink(wordId, t))
}

function removeUnusedTagsFromWord(tags: ITagAttached[], wordId: string) {
  const prevTags = listTagsByWordId(wordId)
  const filteredTags = prevTags.filter((t) => !tags.includes(t))

  filteredTags.forEach((t) => removeTagFromWord(t.id, wordId))

  return filteredTags
}

export function removeTagFromWord(tagId: string, wordId: string): void {
  getDb().prepare('DELETE FROM tagWord WHERE tagId = ? AND wordId = ?').run(tagId, wordId)
}

export function deleteTag(tagId: string): void {
  getDb().prepare('DELETE FROM tag WHERE id = ?').run(tagId)
}
