// Imports
import { parseArray } from './parse_array';
import { parseBigInt } from './parse_big_int';
import { parseBoolean } from './parse_boolean';
import { parseNull } from './parse_null';
import { parseNumber } from './parse_number';
import { parseRegExp } from './parse_reg_exp';
import { parseString } from './parse_string';
import { parseTuple } from './parse_tuple';
import { parseUndefined } from './parse_undefined';

// Named exports
export {
  parseArray,
  parseBigInt,
  parseBoolean,
  parseNull,
  parseNumber,
  parseRegExp,
  parseString,
  parseTuple,
  parseUndefined
};

// Default export
const buildIn = {
  parseArray,
  parseBigInt,
  parseBoolean,
  parseNull,
  parseNumber,
  parseRegExp,
  parseString,
  parseTuple,
  parseUndefined,
};

export default buildIn;
