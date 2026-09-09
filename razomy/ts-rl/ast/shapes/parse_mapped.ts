import { MappedTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseMapped(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    shapeIdentifier: tsRl.ast.shapes.parseShapeIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint()
      ? (tsRl.ast.shapes.parse(typeParam.getConstraint()!) as any)
      : (null as any),
    shape: node.getTypeNode() ? (tsRl.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
  };
}
