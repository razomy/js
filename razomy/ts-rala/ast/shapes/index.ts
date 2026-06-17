// Imports
import { isKeyword } from './is_keyword';
import { mapName } from './map_name';
import { parse } from './parse';
import { parseArray } from './parse_array';
import { parseFunction } from './parse_function';
import { parseIntersection } from './parse_intersection';
import { parseKeyword } from './parse_keyword';
import { parseLiteral } from './parse_literal';
import { parseMapped } from './parse_mapped';
import { parseObject } from './parse_object';
import { parseProperty } from './parse_property';
import { parseReferenceNode } from './parse_reference_node';
import { parseShapeIdentifier } from './parse_shape_identifier';
import { parseTemplate } from './parse_template';
import { parseTuple } from './parse_tuple';
import { parseUnion } from './parse_union';

// Named exports
export {
  isKeyword,
  mapName,
  parse,
  parseArray,
  parseFunction,
  parseIntersection,
  parseKeyword,
  parseLiteral,
  parseMapped,
  parseObject,
  parseProperty,
  parseReferenceNode,
  parseShapeIdentifier,
  parseTemplate,
  parseTuple,
  parseUnion
};

// Default export
const shapes = {
  isKeyword,
  mapName,
  parse,
  parseArray,
  parseFunction,
  parseIntersection,
  parseKeyword,
  parseLiteral,
  parseMapped,
  parseObject,
  parseProperty,
  parseReferenceNode,
  parseShapeIdentifier,
  parseTemplate,
  parseTuple,
  parseUnion,
};

export default shapes;
