// Imports
import * as buildIn from './build_in';
import { isExpression } from './is_expression';
import { parse } from './parse';
import { parseArrowFunction } from './parse_arrow_function';
import { parseBinary } from './parse_binary';
import { parseCall } from './parse_call';
import { parseCondition } from './parse_condition';
import { parseMember } from './parse_member';
import { parseNew } from './parse_new';
import { parseReference } from './parse_reference';
import { parseUnary } from './parse_unary';

// Named exports
export {
  buildIn,
  isExpression,
  parse,
  parseArrowFunction,
  parseBinary,
  parseCall,
  parseCondition,
  parseMember,
  parseNew,
  parseReference,
  parseUnary
};

// Default export
const expressions = {
  buildIn,
  isExpression,
  parse,
  parseArrowFunction,
  parseBinary,
  parseCall,
  parseCondition,
  parseMember,
  parseNew,
  parseReference,
  parseUnary,
};

export default expressions;
