import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parse(node: Node): abstracts.translators.ExpressionType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return tsRala.ast.expressions.buildIn.parseString(node);
  }
  if (Node.isNumericLiteral(node)) {
    return tsRala.ast.expressions.buildIn.parseNumber(node);
  }
  if (Node.isObjectLiteralExpression(node)) {
    return {
      kind: 'BuildInExpression',
      type: 'Object',
      value: node.getText(),
    };
  }
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node)) {
    return tsRala.ast.expressions.buildIn.parseBoolean(node as any);
  }
  if (Node.isNullLiteral(node)) {
    return tsRala.ast.expressions.buildIn.parseNull(node);
  }
  if (Node.isIdentifier(node) && node.getText() === 'undefined') {
    return tsRala.ast.expressions.buildIn.parseUndefined(node);
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
        arguments_: node.getArguments().map((i) => tsRala.ast.expressions.parse(i)),
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
    return tsRala.ast.expressions.buildIn.parseBigInt(node);
  }
  if (Node.isRegularExpressionLiteral(node)) {
    return tsRala.ast.expressions.buildIn.parseRegExp(node);
  }
  if (Node.isArrayLiteralExpression(node)) {
    return tsRala.ast.expressions.buildIn.parseArray(node);
  }

  // 1. Бинарные выражения
  if (Node.isBinaryExpression(node)) {
    return tsRala.ast.expressions.parseBinary(node);
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
    const unary = tsRala.ast.expressions.parseUnary(node);
    if (unary) return unary;
  }

  // 3. Круглые скобки
  if (Node.isParenthesizedExpression(node)) {
    return tsRala.ast.expressions.parse(node.getExpression());
  }

  if (Node.isIdentifier(node)) {
    return tsRala.ast.expressions.parseReference(node);
  }

  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node)) {
    return tsRala.ast.expressions.parseMember(node);
  }

  if (Node.isNewExpression(node)) {
    return tsRala.ast.expressions.parseNew(node);
  }

  if (Node.isCallExpression(node)) {
    return tsRala.ast.expressions.parseCall(node);
  }

  if (Node.isArrowFunction(node)) {
    return tsRala.ast.expressions.parseArrowFunction(node);
  }

  if (Node.isConditionalExpression(node)) {
    return tsRala.ast.expressions.parseConditional(node);
  }

  if (Node.isAsExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'as',
      expression: tsRala.ast.expressions.parse(node.getExpression())!,
      isPrefix: true,
      shape: tsRala.ast.shapes.parse(node.getTypeNode()!),
    };
  }

  throw new Error(`Unrecognized expression: "${node.getText()}": ${node.getKindName()}`);
}
