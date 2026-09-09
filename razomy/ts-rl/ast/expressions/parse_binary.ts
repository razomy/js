import { BinaryExpression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse } from './parse';

export function parseBinary(node: BinaryExpression): translators.BinaryAst {
  return {
    kind: 'BinaryAst',
    syntaxLayer: 2,
    operator: node.getOperatorToken().getText() as translators.BinaryAst['operator'],
    left: parse(node.getLeft())!,
    right: parse(node.getRight())!,
  };
}
