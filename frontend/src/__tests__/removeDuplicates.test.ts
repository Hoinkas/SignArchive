import type { IRegionToFE } from '@src/models/region.model'
import type { IWordAttached } from '@src/models/word.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'
import { removeRegionDuplicates, removeWordsDuplicates, removeYearsDuplicates, renameWordsDuplicates } from '@src/utils/removeDuplicates'
import { describe, expect, test } from 'vitest'

describe('Remove regions duplicates', () => {
    test.for<{name: string; data: IRegionToFE[]; expected: IRegionToFE[]}>([
        {
            name: 'Return empty array for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Dont remove any of two different regions',
            data: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}, {id: 'bbb', name: 'Małopolskie'}],
            expected: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}, {id: 'bbb', name: 'Małopolskie'}]
        },
        {
            name: 'Remove one of two identical regions with parentName',
            data: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}, {id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}],
            expected: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}]
        },
        {
            name: 'Remove one of two identical regions without parentName',
            data: [{id: 'bbb', name: 'Małopolskie'}, {id: 'bbb', name: 'Małopolskie'}],
            expected: [{id: 'bbb', name: 'Małopolskie'}]
        },
        {
            name: 'Dont remove any of two different regions - one with parentName the same as name of other region',
            data: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}, {id: 'bbb', name: 'Śląsk'}],
            expected: [{id: 'aaa', name: 'Katowice', parentName: 'Śląsk'}, {id: 'bbb', name: 'Śląsk'}]
        },
        
    ])('$name', ({data, expected}) => expect(removeRegionDuplicates(data)).toStrictEqual(expected))
})

describe('Remove years duplicates', () => {
    test.for<{name: string; data: IYearStartEnd[]; expected: IYearStartEnd[]}>([
        {
            name: 'Return empty array for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Dont remove any of two different years',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1210, yearEnd: 1215}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1210, yearEnd: 1215}]
        },
        {
            name: 'Dont remove any of two different years - one without yearEnd',
            data: [{yearStart: 1900}, {yearStart: 1210, yearEnd: 1215}],
            expected: [{yearStart: 1900}, {yearStart: 1210, yearEnd: 1215}]
        },
        {
            name: 'Dont remove any of two different years - both without yearEnd',
            data: [{yearStart: 1900}, {yearStart: 1210}],
            expected: [{yearStart: 1900}, {yearStart: 1210}]
        },
        {
            name: 'Remove one of two same years',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1900, yearEnd: 1910}],
            expected: [{yearStart: 1900, yearEnd: 1910}]
        },
        {
            name: 'Remove one of two same years - both without yearEnd',
            data: [{yearStart: 1900}, {yearStart: 1900}],
            expected: [{yearStart: 1900}]
        },
        {
            name: 'Dont remove any of two different years - one with yearStart the same as other yearStart',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1900, yearEnd: 1920}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1900, yearEnd: 1920}]
        },
        {
            name: 'Dont remove any of two different years - one with yearStart the same as other yearEnd',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1800, yearEnd: 1900}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1800, yearEnd: 1900}]
        },
        {
            name: 'Dont remove any of two different years - one with yearEnd the same as other yearStart',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1910, yearEnd: 1920}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1910, yearEnd: 1920}]
        },
        {
            name: 'Dont remove any of two different years - one with yearEnd the same as other yearEnd',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1901, yearEnd: 1910}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1901, yearEnd: 1910}]
        },
        {
            name: 'Dont remove any of two different years - one within another',
            data: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1901, yearEnd: 1909}],
            expected: [{yearStart: 1900, yearEnd: 1910}, {yearStart: 1901, yearEnd: 1909}]
        },
        {
            name: 'Dont remove any of two different years - the same yearStart but one without yearEnd',
            data: [{yearStart: 1900}, {yearStart: 1900, yearEnd: 1910}],
            expected: [{yearStart: 1900}, {yearStart: 1900, yearEnd: 1910}],
        }
    ])('$name', ({data, expected}) => expect(removeYearsDuplicates(data)).toStrictEqual(expected))
})

describe('Remove words duplicates', () => {
    test.for<{name: string; data: IWordAttached[]; expected: IWordAttached[]}>([
        {
            name: 'Return empty array for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Dont remove any of different words',
            data: [{id: 'a', name: 'Pan'}, {id: 'b', name: 'Pani'}],
            expected: [{id: 'a', name: 'Pan'}, {id: 'b', name: 'Pani'}]
        },
        {
            name: 'Remove duplicated words',
            data: [{id: 'a', name: 'Pan'}, {id: 'a', name: 'Pan'}],
            expected: [{id: 'a', name: 'Pan'}]
        },
        {
            name: 'Remove different words with the same name',
            data: [{id: 'a', name: 'Pan'}, {id: 'b', name: 'Pan'}],
            expected: [{id: 'a', name: 'Pan'}, {id: 'b', name: 'Pan'}]
        },
    ])('$name', ({data, expected}) => expect(removeWordsDuplicates(data)).toStrictEqual(expected))
})

describe('Rename words duplicates', () => {
    test.for<{name: string; data: IWordAttached[]; expected: IWordAttached[]}>([
        {
            name: 'Return empty array for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Dont rename two different words',
            data: [{id: 'aaa', name: 'Katar'}, {id: 'bbb', name: 'Malezja'}],
            expected: [{id: 'aaa', name: 'Katar'}, {id: 'bbb', name: 'Malezja'}]
        },
        {
            name: 'Rename two same words into word_1 and word_2',
            data: [{id: 'aaa', name: 'Katar'}, {id: 'aaa', name: 'Katar'}],
            expected: [{id: 'aaa', name: 'Katar_1'}, {id: 'aaa', name: 'Katar_2'}]
        },
        {
            name: 'Rename two same words into word_1 and word_2 and dont rename one different',
            data: [{id: 'aaa', name: 'Katar'}, {id: 'aaa', name: 'Katar'}, {id: 'bbb', name: 'Malezja'}],
            expected: [{id: 'aaa', name: 'Katar_1'}, {id: 'aaa', name: 'Katar_2'}, {id: 'bbb', name: 'Malezja'}]
        },
        {
            name: 'Rename two same words pairs into word_1 and word_2 and name_1 and name_2',
            data: [{id: 'aaa', name: 'Katar'}, {id: 'aaa', name: 'Katar'}, {id: 'bbb', name: 'Malezja'},  {id: 'bbb', name: 'Malezja'}],
            expected: [{id: 'aaa', name: 'Katar_1'}, {id: 'aaa', name: 'Katar_2'}, {id: 'bbb', name: 'Malezja_1'},  {id: 'bbb', name: 'Malezja_2'}]
        },
    ])('$name', ({data, expected}) => expect(renameWordsDuplicates(data)).toStrictEqual(expected))
})