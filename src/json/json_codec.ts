import {ICodec} from 'razomy.js/codec/i_codec';
import {Json} from 'razomy.js/json/json';

export class JsonCodec<T extends Json> implements ICodec<T, string> {
  encode(state: T): string {
    return JSON.stringify(state, null, 2);
  }

  decode(data: string): T {
    return JSON.parse(data);
  }
}
