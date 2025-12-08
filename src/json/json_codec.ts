import {ICodec} from 'razomy.js/codec/i_codec';
import {Json} from 'razomy.js/json/json';

export function json_to_string(state: Json): string {
  return JSON.stringify(state, null, 2);
}

export function string_to_json<T extends Json>(data: string): T {
  return JSON.parse(data);
}

export class JsonCodec<T extends Json> implements ICodec<T, string> {
  encode(state: T): string {
    return json_to_string(state);
  }

  decode(data: string): T {
    return string_to_json(data);
  }
}
