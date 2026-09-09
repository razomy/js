import { ArrayLiteralExpression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from '../parse';

export function parseTuple(node: ArrayLiteralExpression): translators.TupleAst {
  return {
    kind: 'TupleAst',
    syntaxLayer: 2,
    semanticLayer: 1,
    values: node.getElements().map(parseExpr).filter(Boolean) as translators.AstType[],
  };
}
