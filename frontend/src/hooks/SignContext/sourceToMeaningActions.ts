import { regionApi } from '@src/services/region.api'
import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import type { IRegionAttached } from '@src/models/region.model'
import type { ISourceDetails } from '@src/models/source.model'

export function getRegionChanges(oldRegions: DropdownOption[], newRegions: DropdownOption[]) {
  return {
    toAdd: newRegions.filter((nr) => !oldRegions.some((or) => or.label === nr.label)),
    toDelete: oldRegions.filter((or) => !newRegions.some((nr) => or.label === nr.label))
  }
}

export function addRegionsToSource(
  sourceId: string,
  regions: DropdownOption[]
): Promise<IRegionAttached[]> {
  return Promise.all(regions.map((r) => regionApi.create(sourceId, { name: r.label })))
}

export function deleteRegionsFromSource(
  sourceId: string,
  regions: DropdownOption[]
): Promise<void[]> {
  return Promise.all(regions.map((r) => regionApi.delete(sourceId, r.id)))
}

export function applyRegionChangesToState(
  sources: ISourceDetails[],
  sourceId: string,
  sourceChanges: Partial<ISourceDetails>,
  addedRegions: IRegionAttached[],
  deletedIds: string[]
): ISourceDetails[] {
  return sources.map((s) =>
    s.id !== sourceId
      ? s
      : {
          ...s,
          ...sourceChanges,
          regions: [...s.regions.filter((r) => !deletedIds.includes(r.id)), ...addedRegions]
        }
  )
}
