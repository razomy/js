import { TypeReferenceNode as TsTypeReferenceNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceShape {
  const shapeIdentifier = tsLang.ast.shapes.parseShapeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  return {
    kind: 'ReferenceShape',
    shapeIdentifier,
    shapes: typeArgs.map((arg) => tsLang.ast.shapes.parse(arg) as any).filter(Boolean),
  };
}
