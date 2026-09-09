import { CallExpression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse } from './parse';

export function parseCall(node: CallExpression): translators.CallAst {
  const expressionNode = node.getExpression();
  const identifierName = expressionNode.getKindName() === 'Identifier' ? expressionNode.getText() : null;
  
  return {
    kind: 'CallAst', syntaxLayer: 2,
    identifier: identifierName ? { name: identifierName } : null,
    arguments_: node.getArguments().map(arg => parse(arg as any)!),
  };
}
