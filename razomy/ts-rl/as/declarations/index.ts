// Imports
import { getPublicOnlyMut } from './get_public_only_mut';
import { isDeclarations } from './is_declarations';
import { parseClass } from './parse_class';
import { parseEnum } from './parse_enum';
import { parseFunction } from './parse_function';
import { parseInterface } from './parse_interface';
import { parseModule } from './parse_module';
import { parseModuleBody } from './parse_module_body';

// Named exports
export {
  getPublicOnlyMut,
  isDeclarations,
  parseClass,
  parseEnum,
  parseFunction,
  parseInterface,
  parseModule,
  parseModuleBody
};

// Default export
const declarations = {
  getPublicOnlyMut,
  isDeclarations,
  parseClass,
  parseEnum,
  parseFunction,
  parseInterface,
  parseModule,
  parseModuleBody,
};

export default declarations;
