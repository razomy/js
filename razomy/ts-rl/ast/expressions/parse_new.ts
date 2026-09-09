import { NewExpression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse } from './parse';

export function parseNew(node: NewExpression): translators.CallAst {
  const expressionNode = node.getExpression();
  return {
    kind: 'CallAst', syntaxLayer: 2,
    identifier: { name: expressionNode.getText() }, // CallAst in model acts as generic invoke
    arguments_: node.getArguments().map(arg => parse(arg as any)!),
  };
}
