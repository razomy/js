// Imports
import { getPackage } from './get_package';
import { getPublicOnlyMut } from './get_public_only_mut';
import { isBindings } from './is_bindings';
import { parse } from './parse';
import { parseEnum } from './parse_enum';
import { parseEnumProperty } from './parse_enum_property';
import { parseExport } from './parse_export';
import { parseFunction } from './parse_function';
import { parseIdentifier } from './parse_identifier';
import { parseModule } from './parse_module';
import { parseModuleBody } from './parse_module_body';
import { parseParameter } from './parse_parameter';
import { parseProperty } from './parse_property';
import { parseStatement } from './parse_statement';
import { parseVariable } from './parse_variable';

// Named exports
export {
  getPackage,
  getPublicOnlyMut,
  isBindings,
  parse,
  parseEnum,
  parseEnumProperty,
  parseExport,
  parseFunction,
  parseIdentifier,
  parseModule,
  parseModuleBody,
  parseParameter,
  parseProperty,
  parseStatement,
  parseVariable
};

// Default export
const bindings = {
  getPackage,
  getPublicOnlyMut,
  isBindings,
  parse,
  parseEnum,
  parseEnumProperty,
  parseExport,
  parseFunction,
  parseIdentifier,
  parseModule,
  parseModuleBody,
  parseParameter,
  parseProperty,
  parseStatement,
  parseVariable,
};

export default bindings;
