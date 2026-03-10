import {createFloat} from './create_float';

export function createFloatRange(from: number, to: number): number {
  return createFloat() * (to - from) + from;
}