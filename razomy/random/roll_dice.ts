import { createInt } from './create_int';

/**
 * @summary Roll one or more dice and return the results.
 * @description Simulates rolling a specified number of dice, each with a given number of sides, returning an array of random integer results.
 * @param diceCount The number of dice to roll.
 * @param sides The number of sides on each die.
 * @returns An array of random integers, one per die, each in the range [1, sides].
 * @example
 * ```ts
 * rollDice(); // => [3, 5] (two six-sided dice)
 * ```
 * @example
 * ```ts
 * rollDice(1, 20); // => [14] (one twenty-sided die)
 * ```
 * @example
 * ```ts
 * rollDice(4, 6); // => [2, 6, 1, 4] (four six-sided dice)
 * ```
 * @complexity time O(n) where n is diceCount
 * @complexity memory O(n)
 */
export function rollDice(diceCount: number = 2, sides: number = 6): number[] {
  return Array.from({ length: diceCount }, () => createInt(1, sides));
}
