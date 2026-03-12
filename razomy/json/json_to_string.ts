import * as json from '@razomy/json';

export function jsonToString(state: json.Json): string {
  return JSON.stringify(state, null, 2);
}
