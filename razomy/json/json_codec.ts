import * as abstracts from '@razomy/abstracts';
import * as json from '@razomy/json';

export class JsonCodec<T extends json.Json> implements abstracts.patterns.Codec<T, string> {
  encode(state: T): string {
    return json.jsonToString(state);
  }

  decode(data: string): T {
    return json.stringToJson(data);
  }
}
