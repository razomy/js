import { shuffleArray } from '@razomy/random';

/**
 * @summary Split an array into a specified number of groups with randomly distributed elements.
 * @description Shuffles the input array and distributes elements round-robin into the specified number of groups. The original array is not mutated.
 * @param array The array of elements to split.
 * @param groupsCount The number of groups to create.
 * @returns An array of groups, each being an array of elements.
 * @throws {RangeError} If groupsCount is less than 1.
 * @example
 * ```ts
 * splitIntoGroups([1, 2, 3, 4], 2); // => e.g. [[3, 1], [4, 2]]
 * ```
 * @example
 * ```ts
 * splitIntoGroups(['a', 'b', 'c'], 3); // => e.g. [['b'], ['c'], ['a']]
 * ```
 * @example
 * ```ts
 * splitIntoGroups([10, 20, 30, 40, 50], 2); // => e.g. [[30, 50, 10], [20, 40]]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function splitIntoGroups<T>(array: T[], groupsCount: number): T[][] {
  if (groupsCount < 1) {
    throw new RangeError('groupsCount must be at least 1');
  }

  const shuffled: T[] = shuffleArray(array);
  const groups: T[][] = Array.from({ length: groupsCount }, (): T[] => []);

  for (let i = 0; i < shuffled.length; i++) {
    groups[i % groupsCount].push(shuffled[i]);
  }

  return groups;
}
