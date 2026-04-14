import {TypeReferenceNode as TsTypeReferenceNode} from "ts-morph";
import {parseShape} from "./parse_shape";
import * as abstracts from "@razomy/abstracts";
import {parseShapeIdentifier} from "./parse_shape_identifier";

export function parseReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceShape {
  const shapeIdentifier = parseShapeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  return {
    kind: 'ReferenceShape',
    shapeIdentifier,
    shapes: typeArgs.map(arg => parseShape(arg) as any).filter(Boolean),
  };

}
