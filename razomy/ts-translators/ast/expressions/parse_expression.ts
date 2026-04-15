import { Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseExpression(node: Node): abstracts.translators.ExpressionType | null {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseStringExpression(node);
  }
  if (Node.isNumericLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseNumberExpression(node);
  }
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseBooleanExpression(node as any);
  }
  if (Node.isNullLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseNullExpression(node);
  }
  if (Node.isIdentifier(node) && node.getText() === 'undefined') {
    return tsTranslators.ast.expressions.buildIn.parseUndefinedExpression(node);
  }
  if (Node.isBigIntLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseBigIntExpression(node);
  }
  if (Node.isRegularExpressionLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseRegExpExpression(node);
  }
  if (Node.isArrayLiteralExpression(node)) {
    return tsTranslators.ast.expressions.buildIn.parseArrayExpression(node);
  }
  return null;
}
