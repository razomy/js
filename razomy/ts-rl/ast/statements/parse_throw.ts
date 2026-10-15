import { ThrowStatement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from "@razomy/random";

export function parseThrow(node: ThrowStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ThrowAsn {
  return {
    id: random.createUuid(),
    kind: 'ThrowAsn',
    syntaxRole: 'statement',
    value: tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstractions.translators.StateAsnType,
  };
}
