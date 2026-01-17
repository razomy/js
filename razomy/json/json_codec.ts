import {Json} from './json';
import {string_to_json} from './string_to_json';
import {json_to_string} from './json_to_string';
import { Codec } from 'razomy.codec';

export class JsonCodec<T extends Json> implements Codec<T, string> {
  encode(state: T): string {
    return json_to_string(state);
  }

  decode(data: string): T {
    return string_to_json(data);
  }
}