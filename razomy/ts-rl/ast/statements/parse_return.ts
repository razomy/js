import { ReturnStatement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from "../expressions/parse";

export function parseReturn(node: ReturnStatement): translators.ReturnAst {
  return {
    kind: 'ReturnAst', syntaxLayer: 3,
    value: node.getExpression() ? parseExpr(node.getExpression()!) as translators.StateAstType : null,
  };
}
