import { MappedTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseMapped(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    shapeIdentifier: tsRala.ast.shapes.parseShapeIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint()
      ? (tsRala.ast.shapes.parse(typeParam.getConstraint()!) as any)
      : (null as any),
    shape: node.getTypeNode() ? (tsRala.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
  };
}
