// Imports
import * as bindings from './bindings';
import * as declarations from './declarations';
import * as doc from './doc';
import * as expressions from './expressions';
import { parseNode } from './parse_node';
import { parsePackage } from './parse_package';
import * as shapes from './shapes';
import * as statements from './statements';
import { UnknownNodeException } from './unknown_node_exception';

// Named exports
export {
  UnknownNodeException,
  bindings,
  declarations,
  doc,
  expressions,
  parseNode,
  parsePackage,
  shapes,
  statements
};

// Default export
const ast = {
  bindings,
  declarations,
  doc,
  expressions,
  parseNode,
  parsePackage,
  shapes,
  statements,
  UnknownNodeException,
};

export default ast;
