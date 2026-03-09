import {createInt} from './createInt';

/**
 * Бросает виртуальные кубики
 */
export const rollDice = (diceCount: number = 2, sides: number = 6): number[] =>
  Array.from({length: diceCount}, () => createInt(1, sides));