import {ICodec} from "razomy.js/codec/i_codec";

export class JsonCodec<T> implements ICodec<T, string> {
    encode(state: T): string {
        return JSON.stringify(state, null, 2);
    }

    decode(data: string): T {
        return JSON.parse(data);
    }
}
