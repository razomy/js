// Imports
import { isBindings } from './is_bindings';
import { parse } from './parse';
import { parseAlias } from './parse_alias';
import { parseExport } from './parse_export';
import { parseExportAssignment } from './parse_export_assignment';
import { parseMethod } from './parse_method';
import { parseParameter } from './parse_parameter';
import { parseProperty } from './parse_property';
import { parseVariable } from './parse_variable';

// Named exports
export {
  isBindings,
  parse,
  parseAlias,
  parseExport,
  parseExportAssignment,
  parseMethod,
  parseParameter,
  parseProperty,
  parseVariable
};

// Default export
const bindings = {
  isBindings,
  parse,
  parseAlias,
  parseExport,
  parseExportAssignment,
  parseMethod,
  parseParameter,
  parseProperty,
  parseVariable,
};

export default bindings;
