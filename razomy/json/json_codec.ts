import {Json} from './json';
import {stringToJson} from './string_to_json';
import {jsonToString} from './json_to_string';
import {Codec} from 'razomy.codec';

export class JsonCodec<T extends Json> implements Codec<T, string> {
  encode(state: T): string {
    return jsonToString(state);
  }

  decode(data: string): T {
    return stringToJson(data);
  }
}