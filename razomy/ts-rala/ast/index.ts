// Imports
import * as bindings from './bindings';
import * as doc from './doc';
import * as expressions from './expressions';
import * as shapeBindings from './shapeBindings';
import * as shapes from './shapes';
import * as statements from './statements';

// Named exports
export {
  bindings,
  doc,
  expressions,
  shapeBindings,
  shapes,
  statements
};

// Default export
const ast = {
  bindings,
  doc,
  expressions,
  shapeBindings,
  shapes,
  statements,
};

export default ast;
