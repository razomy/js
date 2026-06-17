// Imports
import { arrayBufferFromBase64 } from './array_buffer_from_base_64';
import { base64FromArrayBuffer } from './base_64_from_array_buffer';
import { decodeJsonString } from './decode_json_string';
import { decodeString } from './decode_string';
import { encodeJsonString } from './encode_json_string';
import { encodeString } from './encode_string';

// Named exports
export {
  arrayBufferFromBase64,
  base64FromArrayBuffer,
  decodeJsonString,
  decodeString,
  encodeJsonString,
  encodeString
};

// Default export
const compression = {
  arrayBufferFromBase64,
  base64FromArrayBuffer,
  decodeJsonString,
  decodeString,
  encodeJsonString,
  encodeString,
};

export default compression;
