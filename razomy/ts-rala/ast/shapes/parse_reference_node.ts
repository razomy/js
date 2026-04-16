import { TypeReferenceNode as TsTypeReferenceNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceShape {
  const shapeIdentifier = tsRala.ast.shapes.parseShapeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  return {
    kind: 'ReferenceShape',
    shapeIdentifier,
    shapes: typeArgs.map((arg) => tsRala.ast.shapes.parse(arg) as any).filter(Boolean),
  };
}
