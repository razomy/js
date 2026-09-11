// Imports
import { parseAlias } from './parse_alias';
import { parseClass } from './parse_class';
import { parseInterface } from './parse_interface';

// Named exports
export {
  parseAlias,
  parseClass,
  parseInterface
};

// Default export
const shapeBindings = {
  parseAlias,
  parseClass,
  parseInterface,
};

export default shapeBindings;
