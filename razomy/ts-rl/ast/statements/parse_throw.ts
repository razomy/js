import { ThrowStatement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from "../expressions/parse";

export function parseThrow(node: ThrowStatement): translators.ThrowAst {
  return {
    kind: 'ThrowAst', syntaxLayer: 3,
    value: node.getExpression() ? parseExpr(node.getExpression()!) as translators.StateAstType : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: undefined },
  };
}
