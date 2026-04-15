import { TypeReferenceNode as TsTypeReferenceNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceShape {
  const shapeIdentifier = tsTranslators.ast.shapes.parseShapeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  return {
    kind: 'ReferenceShape',
    shapeIdentifier,
    shapes: typeArgs.map((arg) => tsTranslators.ast.shapes.parse(arg) as any).filter(Boolean),
  };
}
