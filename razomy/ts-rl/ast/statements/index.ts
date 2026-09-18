// Imports
import { isStatement } from './is_statement';
import { parse } from './parse';
import { parseCondition } from './parse_condition';
import { parseReturn } from './parse_return';
import { parseSwitch } from './parse_switch';
import { parseThrow } from './parse_throw';

// Named exports
export {
  isStatement,
  parse,
  parseCondition,
  parseReturn,
  parseSwitch,
  parseThrow
};

// Default export
const statements = {
  isStatement,
  parse,
  parseCondition,
  parseReturn,
  parseSwitch,
  parseThrow,
};

export default statements;
