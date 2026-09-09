import {ConditionalExpression} from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import {parse} from './parse';

export function parseCondition(node: ConditionalExpression): translators.TernaryAst {
  return {
    kind: 'TernaryAst', syntaxLayer: 2,
    branches: [
      {
        kind: 'ConditionBranchAst',
        syntaxLayer: 2,
        pattern: parse(node.getCondition())!,
        value: parse(node.getWhenTrue())!
      } as translators.ConditionBranchAst,
      {kind: 'ElseBranchAst', syntaxLayer: 2, value: parse(node.getWhenFalse())!} as translators.ElseBranchAst
    ]
  };
}
