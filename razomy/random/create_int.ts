import * as random from '@razomy/random';

export function createInt(min: number = 0, max: number = 100): number {
  return Math.floor(random.createFloat() * (max - min + 1)) + min;
}
