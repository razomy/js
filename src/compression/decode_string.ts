import pako from 'pako';
import {array_buffer_from_base64} from './array_buffer_from_base64';

export function decode_string(encodedStr: string): string {
    const encoded_data = array_buffer_from_base64(encodedStr);
    const decoded_data = pako.inflate(encoded_data, { to: 'string' });
    return decoded_data;
}
