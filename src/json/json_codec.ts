import {Codec} from 'razomy.codec/codec';
import {Json} from 'razomy.json/json';
import {string_to_json} from './string_to_json';

export function json_to_string(state: Json): string {
  return JSON.stringify(state, null, 2);
}

export class JsonCodec<T extends Json> implements Codec<T, string> {
  encode(state: T): string {
    return json_to_string(state);
  }

  decode(data: string): T {
    return string_to_json(data);
  }
}
