import {decode_string} from './decode_string';

export function decode_json_string<T>(encoded_str: string): T {
    const decoded_data = decode_string(encoded_str);
    return JSON.parse(decoded_data) as T;
}
