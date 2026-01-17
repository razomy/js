import {Json} from 'razomy.json/json';

export function json_to_string(state: Json): string {
  return JSON.stringify(state, null, 2);
}

