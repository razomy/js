import { TypeLiteralNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseObject(node: TypeLiteralNode): abstracts.translators.ObjectShape {
  return {
    kind: 'ObjectShape',
    properties: node.getProperties().map((p) => tsTranslators.ast.shapes.parseProperty(p)),
  };
}
