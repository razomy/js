import { FunctionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseFunction(node: FunctionTypeNode): abstracts.translators.FunctionShape {
  return {
    kind: 'FunctionShape',
    shapes: [],
    parameters: node.getParameters().map((p) => tsLang.ast.shapes.parseProperty(p)),
    return_: {
      kind: 'ReturnShape',
      shape: tsLang.ast.shapes.parse(node.getReturnTypeNode()!),
      meta: { description: '' },
    },
  };
}
