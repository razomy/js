import {Json} from 'razomy.json';

export function jsonToString(state: Json): string {
  return JSON.stringify(state, null, 2);
}

