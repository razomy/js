import * as abstractions from '@razomy/abstractions';

export function jsonToString(state: abstractions.patterns.Json): string {
  return JSON.stringify(state, null, 2);
}

