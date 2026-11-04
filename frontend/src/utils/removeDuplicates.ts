export function removeDuplicates<T>(array: T[]): T[]{
    const s = new Set(array)
    return [...s]
}