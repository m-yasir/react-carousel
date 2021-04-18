/**
 * @description returns a random index for a given array length using Math.random
 */
export function generateRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
}

/**
 * @description This function assumes the array has at least one element; augment if needed.
 */
export function pickRandom<T>(array: T[]): T {
    const index = generateRandomIndex(array.length);
    return array[index];
}

export function take<T>(items: T[], offset: number, n: number) {
    return items.slice(offset, n);
}