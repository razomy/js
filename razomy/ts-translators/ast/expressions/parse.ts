import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function isExpression(node: Node): boolean {
  return (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node))
    || (Node.isNumericLiteral(node))
    || (Node.isObjectLiteralExpression(node))
    || (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node))
    || (Node.isNullLiteral(node))
    || (Node.isIdentifier(node) && node.getText() === 'undefined')
    || (Node.isSpreadElement(node))
    || (Node.isAwaitExpression(node))
    || (Node.isCallExpression(node))
    || (Node.isBigIntLiteral(node))
    || (Node.isRegularExpressionLiteral(node))
    || (Node.isArrayLiteralExpression(node))
    // 1. Бинарные выражения
    || (Node.isBinaryExpression(node))
    || (Node.isTemplateExpression(node))
    // 2. Унарные выражения (проверяем сразу 4 типа)
    ||
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
    || (Node.isParenthesizedExpression(node))
    || (Node.isIdentifier(node))
    || (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node))
    || (Node.isNewExpression(node))
    || (Node.isExpressionStatement(node) && Node.isCallExpression(node.getExpression()))
    || (Node.isCallExpression(node))
    || (Node.isArrowFunction(node))
    || (Node.isConditionalExpression(node))
    || (Node.isAsExpression(node));

}

export function parse(node: Node): abstracts.translators.ExpressionType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseString(node);
  }
  if (Node.isNumericLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseNumber(node);
  }
  if (Node.isObjectLiteralExpression(node)) {
    return {
      kind: 'BuildInExpression',
      type: 'Object',
      value: node.getText(),
    };
  }
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseBoolean(node as any);
  }
  if (Node.isNullLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseNull(node);
  }
  if (Node.isIdentifier(node) && node.getText() === 'undefined') {
    return tsTranslators.ast.expressions.buildIn.parseUndefined(node);
  }
  if (Node.isSpreadElement(node)) {
    return {
      kind: 'ReferenceExpression',
      modifiers: ['spread'],
      identifier: {
        kind: 'Identifier',
        name: node.getText(),
      },
    };
  }

  if (Node.isAwaitExpression(node)) {
    if (Node.isCallExpression(node)) {
      return {
        kind: 'CallExpression',
        modifiers: ['async'],
        identifier: {
          kind: 'Identifier',
          name: node.getText(),
        },
        arguments_: node.getArguments().map((i) => tsTranslators.ast.expressions.parse(i)),
      };
    }
    return {
      kind: 'ReferenceExpression',
      modifiers: ['async'],
      identifier: {
        kind: 'Identifier',
        name: node.getText(),
      },
    };
  }
  if (Node.isBigIntLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseBigInt(node);
  }
  if (Node.isRegularExpressionLiteral(node)) {
    return tsTranslators.ast.expressions.buildIn.parseRegExp(node);
  }
  if (Node.isArrayLiteralExpression(node)) {
    return tsTranslators.ast.expressions.buildIn.parseArray(node);
  }

  // 1. Бинарные выражения
  if (Node.isBinaryExpression(node)) {
    return tsTranslators.ast.expressions.parseBinary(node);
  }

  if (Node.isTemplateExpression(node)) {
    return {
      kind: 'TemplateExpression',
      template: node.getText(),
      expressions: (node.getTemplateSpans().map(i => i.getExpression()).map(parse)),
    };
  }

  // 2. Унарные выражения (проверяем сразу 4 типа)
  if (
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
  ) {
    const unary = tsTranslators.ast.expressions.parseUnary(node);
    if (unary) return unary;
  }

  // 3. Круглые скобки
  if (Node.isParenthesizedExpression(node)) {
    return tsTranslators.ast.expressions.parse(node.getExpression());
  }

  if (Node.isIdentifier(node)) {
    return tsTranslators.ast.expressions.parseReference(node);
  }

  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node)) {
    return tsTranslators.ast.expressions.parseMember(node);
  }

  if (Node.isNewExpression(node)) {
    return tsTranslators.ast.expressions.parseNew(node);
  }

  if (Node.isCallExpression(node)) {
    return tsTranslators.ast.expressions.parseCall(node);
  }

  if (Node.isArrowFunction(node)) {
    return tsTranslators.ast.expressions.parseArrowFunction(node);
  }

  if (Node.isConditionalExpression(node)) {
    return tsTranslators.ast.expressions.parseConditional(node);
  }

  if (Node.isAsExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'as',
      expression: tsTranslators.ast.expressions.parse(node.getExpression())!,
      isPrefix: true,
      shape: tsTranslators.ast.shapes.parse(node.getTypeNode()!),
    };
  }

  throw new Error(`Unrecognized expression: "${node.getText()}": ${node.getKindName()}`);
}
