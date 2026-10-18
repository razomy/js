// Imports
import { defaultOffset } from './default_offset';
import { defaultPrevOffset } from './default_prev_offset';
import { getNextOffsetChar } from './get_next_offset_char';
import { getOffsetChar } from './get_offset_char';
import { getPrevOffsetChar } from './get_prev_offset_char';
import { isEnd } from './is_end';
import { setPrevOffset } from './set_prev_offset';
import { tryAnyOfChar } from './try_any_of_char';
import { tryBeforeAnyOfChar } from './try_before_any_of_char';
import { tryRegex } from './try_regex';

// Named exports
export {
  defaultOffset,
  defaultPrevOffset,
  getNextOffsetChar,
  getOffsetChar,
  getPrevOffsetChar,
  isEnd,
  setPrevOffset,
  tryAnyOfChar,
  tryBeforeAnyOfChar,
  tryRegex
};

// Default export
const offset = {
  defaultOffset,
  defaultPrevOffset,
  getNextOffsetChar,
  getOffsetChar,
  getPrevOffsetChar,
  isEnd,
  setPrevOffset,
  tryAnyOfChar,
  tryBeforeAnyOfChar,
  tryRegex,
};

export default offset;
