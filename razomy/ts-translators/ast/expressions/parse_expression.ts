import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseExpression(node: Node): abstracts.translators.ExpressionType {
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

  // 1. Бинарные выражения
  if (Node.isBinaryExpression(node)) {
    return tsTranslators.ast.expressions.parseBinaryExpression(node);
  }

  // 2. Унарные выражения (проверяем сразу 4 типа)
  if (
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
  ) {
    const unary = tsTranslators.ast.expressions.parseUnaryExpression(node);
    if (unary) return unary;
  }

  // 3. Круглые скобки
  if (Node.isParenthesizedExpression(node)) {
    return tsTranslators.ast.expressions.parseExpression(node.getExpression());
  }

  if (Node.isIdentifier(node)) {
    return tsTranslators.ast.expressions.parseReferenceExpression(node);
  }

  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node)) {
    return tsTranslators.ast.expressions.parseMemberExpression(node);
  }

  if (Node.isNewExpression(node)) {
    return tsTranslators.ast.expressions.parseNewExpression(node);
  }

  if (Node.isCallExpression(node)) {
    return tsTranslators.ast.expressions.parseCallExpression(node);
  }

  if (Node.isArrowFunction(node)) {
    return tsTranslators.ast.expressions.parseArrowFunctionExpression(node);
  }

  throw new Error(`Unrecognized expression: ${node.getText()}: ${node.getKindName()}`);
}
