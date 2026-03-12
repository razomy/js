import type { Json } from './json';
import { stringToJson } from './string_to_json';
import { jsonToString } from './json_to_string';
import * as abstracts from '@razomy/abstracts';

export class JsonCodec<T extends Json> implements abstracts.patterns.Codec<T, string> {
  encode(state: T): string {
    return jsonToString(state);
  }

  decode(data: string): T {
    return stringToJson(data);
  }
}
