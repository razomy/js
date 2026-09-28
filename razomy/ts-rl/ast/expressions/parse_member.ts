import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseMember(node: PropertyAccessExpression | ElementAccessExpression): abstracts.translators.MemberAst | abstracts.translators.ArgumentMemberAst {
  if (Node.isPropertyAccessExpression(node)) {
    return {
      kind: 'MemberAst', syntaxRole: 'expression',
      object_: tsRl.ast.expressions.parse(node.getExpression())!,
      property: { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: node.getName() } as abstracts.translators.LiteralAst,
    };
  } else {
    return {
      kind: 'ArgumentMemberAst', syntaxRole: 'expression',
      argument: tsRl.ast.expressions.parse(node.getExpression())!,
      property: tsRl.ast.expressions.parse(node.getArgumentExpressionOrThrow())!,
    };
  }
}
