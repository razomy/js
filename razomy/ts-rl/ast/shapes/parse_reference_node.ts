import { TypeReferenceNode as TsTypeReferenceNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceShape {
  const shapeIdentifier = tsRl.ast.shapes.parseShapeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  return {
    kind: 'ReferenceShape',
    shapeIdentifier,
    shapes: typeArgs.map((arg) => tsRl.ast.shapes.parse(arg) as any).filter(Boolean),
  };
}
