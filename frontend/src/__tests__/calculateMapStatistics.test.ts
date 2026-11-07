import type { IRegionWords } from '@src/models/region.model';
import { calculateMapStatistics, assingWordsToRegions, type IMapStats, type IMapStatsTemp, calculateSignCountForEachRegion } from '@src/utils/calculateMapStatistics';
import { describe, expect, test } from 'vitest'

describe('Calcualte  signs in region', () => {
    test.for<{name: string; data: IRegionWords[]; expected: IMapStats[]}>([
        {
            name: 'Return empty result for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Calculate two different words in the same region',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: [{regionName: 'Śląsk', signsCount: 2}]
        },
        {
            name: 'Calculate two different words for two different regions',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Kraków', 'parentName': 'Małopolskie'}, words: [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: [{regionName: 'Śląsk', signsCount: 2}, {regionName: 'Małopolskie', signsCount: 2}]
        },
        {
            name: 'Calculate two identical pairs for two different regions',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Kraków', 'parentName': 'Małopolskie'}, words:  [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: [{regionName: 'Śląsk', signsCount: 2}, {regionName: 'Małopolskie', signsCount: 2}]
        },
        {
            name: 'Calculate four different words for the same region - one region name is the same as parentName of other',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, words:  [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: [{regionName: 'Śląsk', signsCount: 4}]
        },
        {
            name: 'Calculate four different words for the same region - one region name is the same as parentName of other',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: [{regionName: 'Śląsk', signsCount: 2}]
        },
    ])('$name', ({data, expected}) => expect(calculateMapStatistics(data)).toStrictEqual(expected))

    test.for<{name: string; data: IRegionWords[]; expected: IMapStatsTemp}>([
        {
            name: 'Assign two different words to one region',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign only two of four words - two of them are duplicates',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}, {id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign only two of four words - two of them are duplicates assigned to different region which has the same name as other region parentName',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign four words for two regions - one region has the same name as other region parentName',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, words: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, words:  [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}, {id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
        },
    ])('$name', ({data, expected}) => expect(assingWordsToRegions(data)).toStrictEqual(expected))

    test.for<{name: string; data: IMapStatsTemp; expected: IMapStats[]}>([
    {
        name: 'Calculate one sign for one region',
        data: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
        expected: [{regionName: 'Śląsk', signsCount: 2}]
    },
    {
        name: 'Calculate two euqal pairs of signs for two regions',
        data: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}], 'Małopolskie': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
        expected: [{regionName: 'Śląsk', signsCount: 2}, {regionName: 'Małopolskie', signsCount: 2}]
    },
    ])('$name', ({data, expected}) => expect(calculateSignCountForEachRegion(data)).toStrictEqual(expected))
})