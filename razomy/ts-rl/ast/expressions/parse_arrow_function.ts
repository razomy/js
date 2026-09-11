import { ArrowFunction } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseArrowFunction(node: ArrowFunction): abstracts.translators.LambdaAst {
  return {
    kind: 'LambdaAst', syntaxLayer: 2,
    modifiers: node.isAsync() ? [{ kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'async', value: null }] : [],
    parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
    block: tsRl.ast.statements.parseBlock(node.getBody() as any),
  };
}
