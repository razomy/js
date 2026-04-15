import { MappedTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseMapped(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint()
      ? (tsTranslators.ast.shapes.parse(typeParam.getConstraint()!) as any)
      : (null as any),
    shape: node.getTypeNode() ? (tsTranslators.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
  };
}
