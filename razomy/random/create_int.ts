import {createFloat} from './create_float';

export function createInt (min: number = 0, max: number = 100) : number {
  return Math.floor(createFloat() * (max - min + 1)) + min;
}