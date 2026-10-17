import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseMember(node: PropertyAccessExpression | ElementAccessExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.MemberAsn | abstractions.translators.ArgumentMemberAsn {
  if (Node.isPropertyAccessExpression(node)) {
    const memberAsn: abstractions.translators.MemberAsn = {
      id: random.createUuid(),
      kind: 'MemberAsn',
      syntaxRole: 'expression',
      object_: null as any,
      property: { id: random.createUuid(), kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getName() } as abstractions.translators.LiteralAsn,
    };
    if (!ctx.enter(memberAsn, node)) return memberAsn;
    memberAsn.object_ = tsRl.as.expressions.parse(node.getExpression(), ctx)!;
    return ctx.leave(memberAsn, node);
  } else {
    const argMemberAsn: abstractions.translators.ArgumentMemberAsn = {
      id: random.createUuid(),
      kind: 'ArgumentMemberAsn',
      syntaxRole: 'expression',
      argument: null as any,
      property: null as any,
    };
    if (!ctx.enter(argMemberAsn, node)) return argMemberAsn;
    argMemberAsn.argument = tsRl.as.expressions.parse(node.getExpression(), ctx)!;
    argMemberAsn.property = tsRl.as.expressions.parse(node.getArgumentExpressionOrThrow(), ctx)!;
    return ctx.leave(argMemberAsn, node);
  }
}
