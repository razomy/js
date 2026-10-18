import * as abstractions from '@razomy/abstractions';
import * as json from '@razomy/json';

export class JsonCodec<T extends abstractions.patterns.Json> implements abstractions.patterns.Codec<T, string> {
  encode(state: T): string {
    return json.jsonToString(state);
  }

  decode(data: string): T {
    return json.stringToJson(data);
  }
}
