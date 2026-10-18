// Imports
import { parseArray } from './parse_array';
import { parseBool } from './parse_bool';
import { parseJson } from './parse_json';
import { parseNumber } from './parse_number';
import { parseSwitch } from './parse_switch';
import { parseThrowPanic } from './parse_throw_panic';

// Named exports
export {
  parseArray,
  parseBool,
  parseJson,
  parseNumber,
  parseSwitch,
  parseThrowPanic
};

// Default export
const parsers = {
  parseArray,
  parseBool,
  parseJson,
  parseNumber,
  parseSwitch,
  parseThrowPanic,
};

export default parsers;
