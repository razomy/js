import {createFloat} from './createFloat';

export function createFloatRange(from: number, to: number): number {
  return createFloat() * (to - from) + from;
}