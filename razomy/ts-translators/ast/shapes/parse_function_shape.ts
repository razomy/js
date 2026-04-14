import {FunctionTypeNode} from "ts-morph";
import * as abstracts from "@razomy/abstracts";

import {parseShapeIdentifier} from "./parse_shape_identifier";
import {parsePropertyType} from "../bindings";

export function parseFunctionShape(node: FunctionTypeNode): abstracts.translators.FunctionShape {
  return {
    kind: 'FunctionShape',
    parameters: node.getParameters().map(p => parsePropertyType(p)),
    returnType: {
      kind: 'ReturnShape',
      shapeIdentifier: parseShapeIdentifier(node.getReturnTypeNode()!),
      meta: {description: ''}
    },
  };
}
