import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseMember(
  node: PropertyAccessExpression | ElementAccessExpression
): abstracts.translators.MemberExpression {

  let propertyExpr: abstracts.translators.ExpressionType;

  // Случай 1: obj.property (PropertyAccessExpression)
  if (Node.isPropertyAccessExpression(node)) {
    propertyExpr = {
      kind: 'BuildInExpression',
      type: 'String',
      value: node.getName(),
    };
  }

  // Случай 2: obj[index] (ElementAccessExpression)
  else {
    const argNode = node.getArgumentExpressionOrThrow();
    propertyExpr = tsRala.ast.expressions.parse(argNode)!;
  }

  return {
    kind: 'MemberExpression',
    object_: tsRala.ast.expressions.parse(node.getExpression())!!,
    property: propertyExpr,
  };
}
