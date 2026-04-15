import { FunctionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseFunctionShape(node: FunctionTypeNode): abstracts.translators.FunctionShape {
  return {
    kind: 'FunctionShape',
    shapes: [],
    parameters: node.getParameters().map((p) => tsTranslators.ast.shapes.parsePropertyType(p)),
    return_: {
      kind: 'ReturnShape',
      shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getReturnTypeNode()!),
      meta: { description: '' },
    },
  };
}
