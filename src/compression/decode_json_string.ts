import decode_string from './decode_string';

export default function decode_json_string<T>(encodedStr: string): T {
    const decoded_data = decode_string(encodedStr);
    return JSON.parse(decoded_data) as T;
}
