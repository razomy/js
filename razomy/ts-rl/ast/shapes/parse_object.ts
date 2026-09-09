import { TypeLiteralNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseObject(node: TypeLiteralNode): abstracts.translators.ObjectShape {
  return {
    kind: 'ObjectShape',
    properties: node.getProperties().map((p) => tsRl.ast.shapes.parseProperty(p)),
  };
}
