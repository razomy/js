import { FunctionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseFunction(node: FunctionTypeNode): abstracts.translators.FunctionShape {
  return {
    kind: 'FunctionShape',
    shapes: [],
    parameters: node.getParameters().map((p) => tsRl.ast.shapes.parseProperty(p)),
    returnShape: {
      kind: 'ReturnShape',
      shape: tsRl.ast.shapes.parse(node.getReturnTypeNode()!),
      meta: { description: '' },
    },
  };
}
