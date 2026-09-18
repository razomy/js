// Imports
import * as bindings from './bindings';
import * as declarations from './declarations';
import * as doc from './doc';
import * as expressions from './expressions';
import * as shapes from './shapes';
import * as statements from './statements';
import { UnknownNodeException, parse } from './unknown_node_exception';

// Named exports
export {
  UnknownNodeException,
  bindings,
  declarations,
  doc,
  expressions,
  parse,
  shapes,
  statements
};

// Default export
const ast = {
  bindings,
  declarations,
  doc,
  expressions,
  shapes,
  statements,
  UnknownNodeException,
  parse,
};

export default ast;
