import { ThrowStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';
import * as random from "@razomy/random";

export function parseThrow(node: ThrowStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ThrowAsn {
  return {
    id: random.createUuid(),
    kind: 'ThrowAsn',
    syntaxRole: 'statement',
    value: tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstracts.translators.StateAsnType,
  };
}
