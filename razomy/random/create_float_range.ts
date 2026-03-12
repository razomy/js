import * as random from '@razomy/random';

export function createFloatRange(from: number, to: number): number {
  return random.createFloat() * (to - from) + from;
}
