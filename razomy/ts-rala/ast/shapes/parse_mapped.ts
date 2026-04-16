import { MappedTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseMapped(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    shapeIdentifier: tsLang.ast.shapes.parseShapeIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint()
      ? (tsLang.ast.shapes.parse(typeParam.getConstraint()!) as any)
      : (null as any),
    shape: node.getTypeNode() ? (tsLang.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
  };
}
