import { Node } from 'ts-morph';

export function isExpression(node: Node): boolean {
  return (
    Node.isExpression(node) ||
    Node.isStringLiteral(node) ||
    Node.isNoSubstitutionTemplateLiteral(node) ||
    Node.isNumericLiteral(node) ||
    Node.isObjectLiteralExpression(node) ||
    Node.isBooleanKeyword(node) ||
    Node.isTrueLiteral(node) ||
    Node.isFalseLiteral(node) ||
    Node.isNullLiteral(node) ||
    (Node.isIdentifier(node) && node.getText() === 'undefined') ||
    Node.isSpreadElement(node) ||
    Node.isAwaitExpression(node) ||
    Node.isCallExpression(node) ||
    Node.isBigIntLiteral(node) ||
    Node.isRegularExpressionLiteral(node) ||
    Node.isArrayLiteralExpression(node) ||
    Node.isBinaryExpression(node) ||
    Node.isTemplateExpression(node) ||
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node) ||
    Node.isParenthesizedExpression(node) ||
    Node.isIdentifier(node) ||
    Node.isPropertyAccessExpression(node) ||
    Node.isElementAccessExpression(node) ||
    Node.isNewExpression(node) ||
    (Node.isExpressionStatement(node) && Node.isCallExpression(node.getExpression())) ||
    Node.isArrowFunction(node) ||
    Node.isConditionalExpression(node) ||
    Node.isAsExpression(node)
  );
}
