// Imports
import { isStatement } from './is_statement';
import { parse } from './parse';
import { parseBlock } from './parse_block';
import { parseCondition } from './parse_condition';
import { parseGo } from './parse_go';
import { parseLoop } from './parse_loop';
import { parseReturn } from './parse_return';
import { parseThrow } from './parse_throw';

// Named exports
export {
  isStatement,
  parse,
  parseBlock,
  parseCondition,
  parseGo,
  parseLoop,
  parseReturn,
  parseThrow
};

// Default export
const statements = {
  isStatement,
  parse,
  parseBlock,
  parseCondition,
  parseGo,
  parseLoop,
  parseReturn,
  parseThrow,
};

export default statements;
