import {encode_string} from './encode_string';

export function encode_json_string<T>(str: T): string {
    const input = JSON.stringify(str);
    return encode_string(input);
}
