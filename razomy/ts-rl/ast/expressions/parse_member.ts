import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseMember(node: PropertyAccessExpression | ElementAccessExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.MemberAsn | abstractions.translators.ArgumentMemberAsn {
  if (Node.isPropertyAccessExpression(node)) {
    return {
      kind: 'MemberAsn', syntaxRole: 'expression',
      object_: tsRl.ast.expressions.parse(node.getExpression(), ctx)!,
      property: { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getName() } as abstractions.translators.LiteralAsn,
    };
  } else {
    return {
      kind: 'ArgumentMemberAsn', syntaxRole: 'expression',
      argument: tsRl.ast.expressions.parse(node.getExpression(), ctx)!,
      property: tsRl.ast.expressions.parse(node.getArgumentExpressionOrThrow(), ctx)!,
    };
  }
}
