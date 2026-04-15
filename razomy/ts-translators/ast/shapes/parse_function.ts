import { FunctionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseFunction(node: FunctionTypeNode): abstracts.translators.FunctionShape {
  return {
    kind: 'FunctionShape',
    shapes: [],
    parameters: node.getParameters().map((p) => tsTranslators.ast.shapes.parseProperty(p)),
    return_: {
      kind: 'ReturnShape',
      shape: tsTranslators.ast.shapes.parse(node.getReturnTypeNode()!),
      meta: { description: '' },
    },
  };
}
