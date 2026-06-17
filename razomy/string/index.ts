// Imports
import { addByIndexString } from './add_by_index_string';
import { chunk } from './chunk';
import { chunkByByteLength } from './chunk_by_byte_length';
import { contains } from './contains';
import { containsAny } from './contains_any';
import { countChar } from './count_char';
import { countOccurrences } from './count_occurrences';
import { countSpaceMargin } from './count_space_margin';
import { countSpaceMarginByArray } from './count_space_margin_by_array';
import { countString } from './count_string';
import { create } from './create';
import type { String } from './create';
import { escapeByString } from './escape_by_string';
import { getSimilar } from './get_similar';
import { getWords } from './get_words';
import { indentLines } from './indent_lines';
import { isEndsWith } from './is_ends_with';
import { isEndsWithAny } from './is_ends_with_any';
import { isNullOrEmpty } from './is_null_or_empty';
import { isStartsWith } from './is_starts_with';
import { isString } from './is_string';
import { isStringsAnyIndex } from './is_strings_any_index';
import { join } from './join';
import { lastIndex } from './last_index';
import { levenshteinDistance } from './levenshtein_distance';
import { merge } from './merge';
import { nextMarginIndex } from './next_margin_index';
import { padEnd } from './pad_end';
import { padStart } from './pad_start';
import { prefixLines } from './prefix_lines';
import { removeIndex } from './remove_index';
import { repeat } from './repeat';
import { replace } from './replace';
import { similarity } from './similarity';
import { split } from './split';
import { splitLines } from './split_lines';
import { stringsAnyIndex } from './strings_any_index';
import { stripTags } from './strip_tags';
import { takeAfter } from './take_after';
import { takeBefore } from './take_before';
import { takeBetween } from './take_between';
import { toBuffer } from './to_buffer';
import { trim } from './trim';
import { truncate } from './truncate';
import { unescapeByString } from './unescape_by_string';
import { unescapeMdCode } from './unescape_md_code';
import type { HasString } from './with_string';

// Named exports
export {
  addByIndexString,
  chunk,
  chunkByByteLength,
  contains,
  containsAny,
  countChar,
  countOccurrences,
  countSpaceMargin,
  countSpaceMarginByArray,
  countString,
  create,
  escapeByString,
  getSimilar,
  getWords,
  indentLines,
  isEndsWith,
  isEndsWithAny,
  isNullOrEmpty,
  isStartsWith,
  isString,
  isStringsAnyIndex,
  join,
  lastIndex,
  levenshteinDistance,
  merge,
  nextMarginIndex,
  padEnd,
  padStart,
  prefixLines,
  removeIndex,
  repeat,
  replace,
  similarity,
  split,
  splitLines,
  stringsAnyIndex,
  stripTags,
  takeAfter,
  takeBefore,
  takeBetween,
  toBuffer,
  trim,
  truncate,
  unescapeByString,
  unescapeMdCode
};
export type {
  HasString,
  String
};

// Default export
const string = {
  addByIndexString,
  chunk,
  chunkByByteLength,
  contains,
  containsAny,
  countChar,
  countOccurrences,
  countSpaceMargin,
  countSpaceMarginByArray,
  countString,
  create,
  escapeByString,
  getSimilar,
  getWords,
  indentLines,
  isEndsWith,
  isEndsWithAny,
  isNullOrEmpty,
  isStartsWith,
  isString,
  isStringsAnyIndex,
  join,
  lastIndex,
  levenshteinDistance,
  merge,
  nextMarginIndex,
  padEnd,
  padStart,
  prefixLines,
  removeIndex,
  repeat,
  replace,
  similarity,
  split,
  splitLines,
  stringsAnyIndex,
  stripTags,
  takeAfter,
  takeBefore,
  takeBetween,
  toBuffer,
  trim,
  truncate,
  unescapeByString,
  unescapeMdCode,
};


export default string;
