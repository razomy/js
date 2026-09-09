import { ArrowFunction } from "ts-morph";
import * as translators from '@razomy/abstracts/translators';
import { parseBlock } from "../statements/parse_block";
import { parseParameter } from "../bindings/parse_parameter";
import { parse as parseShape } from "../shapes/parse";

export function parseArrowFunction(node: ArrowFunction): translators.LambdaAst {
  return {
    kind: 'LambdaAst', syntaxLayer: 2,
    modifiers: node.isAsync() ? [{ kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'async', value: null }] : [],
    parameters: node.getParameters().map(parseParameter),
    returnShape: node.getReturnTypeNode() ? parseShape(node.getReturnTypeNode()!) : null,
    block: parseBlock(node.getBody() as any),
  };
}
