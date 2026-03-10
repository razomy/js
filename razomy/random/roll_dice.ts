import {createInt} from './create_int';

export function rollDice (diceCount: number = 2, sides: number = 6) : number[] { return Array.from({length: diceCount}, () => createInt(1, sides)); }