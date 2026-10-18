// Imports
import { CODECS, fileNameToCodec } from './file_name_to_codec';
import { BUFFER_TYPES, IMAGES_BUFFER_TYPES, KEYS_BUFFER_TYPES, MIXED_BUFFER_TYPES, PROGRAMMING_LANGUAGES_BUFFER_TYPES, TEXT_BUFFER_TYPES, TYPES_BUFFER_TYPES, UNIQ_PROGRAMMING_BUFFER_NAME, UNITY_BUFFER_TYPES, VIDEO_BUFFER_TYPES, isSupportedFileTypes } from './is_supported_file_types';
import type { TypeFs } from './is_supported_file_types';
import { toBuffer } from './to_buffer';
import { toString_ } from './to_string';

// Named exports
export {
  BUFFER_TYPES,
  CODECS,
  IMAGES_BUFFER_TYPES,
  KEYS_BUFFER_TYPES,
  MIXED_BUFFER_TYPES,
  PROGRAMMING_LANGUAGES_BUFFER_TYPES,
  TEXT_BUFFER_TYPES,
  TYPES_BUFFER_TYPES,
  UNIQ_PROGRAMMING_BUFFER_NAME,
  UNITY_BUFFER_TYPES,
  VIDEO_BUFFER_TYPES,
  fileNameToCodec,
  isSupportedFileTypes,
  toBuffer,
  toString_
};
export type {
  TypeFs
};

// Default export
const fsFileExtensions = {
  CODECS,
  fileNameToCodec,
  BUFFER_TYPES,
  IMAGES_BUFFER_TYPES,
  KEYS_BUFFER_TYPES,
  MIXED_BUFFER_TYPES,
  PROGRAMMING_LANGUAGES_BUFFER_TYPES,
  TEXT_BUFFER_TYPES,
  TYPES_BUFFER_TYPES,
  UNIQ_PROGRAMMING_BUFFER_NAME,
  UNITY_BUFFER_TYPES,
  VIDEO_BUFFER_TYPES,
  isSupportedFileTypes,
  toBuffer,
  toString_,
};


export default fsFileExtensions;
