import to_serializable_type from './to_serializable_type';
import {Serializable} from './serializable2';

export default function serializable_ctx(d: { [key: string]: any }): { [key: string]: Serializable } {
    const result: { [key: string]: Serializable } = {};
    for (const [k, v] of Object.entries(d)) {
    const s = to_serializable_type(v);
    if (s !== undefined) {
      result[k] = s;
    }
    }

    return result;
}
