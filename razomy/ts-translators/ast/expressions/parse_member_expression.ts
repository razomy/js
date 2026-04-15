import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseMemberExpression(
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
    propertyExpr = tsTranslators.ast.expressions.parseExpression(argNode)!;
  }

  return {
    kind: 'MemberExpression',
    object_: tsTranslators.ast.expressions.parseExpression(node.getExpression())!!,
    property: propertyExpr,
  };
}
