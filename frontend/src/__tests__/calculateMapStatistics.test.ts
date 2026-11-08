import type { IWordAttached } from '@src/models/word.model';
import { calculateCountForEachRegion, groupItemsByRegion, type IMapStats, type IMapStatsTemp, type IRegionItems } from '@src/utils/calculateMapStatistics';
import { removeWordsDuplicates } from '@src/utils/removeDuplicates';
import { describe, expect, test } from 'vitest'

describe('Calcualte  signs in region', () => {
    test.for<{name: string; data: IRegionItems<IWordAttached>[]; expected: IMapStats[]}>([
        {
            name: 'Return empty result for empty array',
            data: [],
            expected: []
        },
        {
            name: 'Calculate two different words in the same region',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: [{regionName: 'Śląsk', count: 2}]
        },
        {
            name: 'Calculate two different words for two different regions',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Kraków', 'parentName': 'Małopolskie'}, items: [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: [{regionName: 'Śląsk', count: 2}, {regionName: 'Małopolskie', count: 2}]
        },
        {
            name: 'Calculate two identical pairs for two different regions',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Kraków', 'parentName': 'Małopolskie'}, items:  [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: [{regionName: 'Śląsk', count: 2}, {regionName: 'Małopolskie', count: 2}]
        },
        {
            name: 'Calculate four different words for the same region - one region name is the same as parentName of other',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, items:  [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: [{regionName: 'Śląsk', count: 4}]
        },
        {
            name: 'Calculate four different words for the same region - one region name is the same as parentName of other',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: [{regionName: 'Śląsk', count: 2}]
        },
    ])('$name', ({data, expected}) => expect(calculateCountForEachRegion(groupItemsByRegion(data, removeWordsDuplicates))).toStrictEqual(expected))

    test.for<{name: string; data: IRegionItems<IWordAttached>[]; expected: IMapStatsTemp<IWordAttached>}>([
        {
            name: 'Assign two different words to one region',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign only two of four words - two of them are duplicates',
            data: [{region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}, {id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign only two of four words - two of them are duplicates assigned to different region which has the same name as other region parentName',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
            ],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]}
        },
        {
            name: 'Assign four words for two regions - one region has the same name as other region parentName',
            data: [
                {region: {id: 'a', name: 'Katowice', 'parentName': 'Śląsk'}, items: [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}]},
                {region: {id: 'aa', name: 'Śląsk'}, items:  [{id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
            ],
            expected: {'Śląsk': [{id: 'b', name: 'Pan'}, {id: 'c', name: 'Pani'}, {id: 'bb', name: 'Kot'}, {id: 'cc', name: 'Pies'}]}
        },
    ])('$name', ({data, expected}) => expect(groupItemsByRegion(data, removeWordsDuplicates)).toStrictEqual(expected))
})