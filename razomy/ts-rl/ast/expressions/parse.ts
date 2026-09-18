import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Node): abstracts.translators.AstType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node))
    return tsRl.ast.expressions.buildIn.parseString(node);
  if (Node.isNumericLiteral(node)) return tsRl.ast.expressions.buildIn.parseNumber(node);
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node))
    return tsRl.ast.expressions.buildIn.parseBoolean(node as any);
  if (Node.isNullLiteral(node)) return tsRl.ast.expressions.buildIn.parseNull(node);
  if (Node.isIdentifier(node) && node.getText() === 'undefined')
    return tsRl.ast.expressions.buildIn.parseUndefined(node);
  if (Node.isBigIntLiteral(node)) return tsRl.ast.expressions.buildIn.parseBigInt(node);
  if (Node.isRegularExpressionLiteral(node)) return tsRl.ast.expressions.buildIn.parseRegExp(node);
  if (Node.isArrayLiteralExpression(node)) return tsRl.ast.expressions.buildIn.parseArray(node);
  if (Node.isObjectLiteralExpression(node)) {
    return { kind: 'ObjectAst', syntaxLayer: 2, semanticLayer: 1, properties: [] }; // Expand as needed
  }
  if (Node.isIdentifier(node)) {
    return {
      kind: 'LiteralAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      value: node.getText(),
    };
  }
  if (Node.isBinaryExpression(node)) {
    return {
      kind: 'BinaryAst',
      syntaxLayer: 3,
      operator: node.getOperatorToken() as any,
      left: tsRl.ast.expressions.parse(node.getLeft()),
      right: tsRl.ast.expressions.parse(node.getRight()),
    };
  }
  if (Node.isCallExpression(node)) return tsRl.ast.expressions.parseCall(node);
  if (
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
  )
    return tsRl.ast.expressions.parseUnary(node);
  if (Node.isParenthesizedExpression(node)) return parse(node.getExpression());
  if (Node.isIdentifier(node)) return tsRl.ast.expressions.parseReference(node);
  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node))
    return tsRl.ast.expressions.parseMember(node);
  if (Node.isNewExpression(node)) return tsRl.ast.expressions.parseNew(node);
  if (Node.isCallExpression(node)) return tsRl.ast.expressions.parseCall(node);
  if (Node.isArrowFunction(node)) return tsRl.ast.expressions.parseArrowFunction(node);
  if (Node.isFunctionExpression(node)) return tsRl.ast.expressions.parseunctionExpression(node);
  if (Node.isConditionalExpression(node)) return tsRl.ast.expressions.parseCondition(node);
  if (Node.isAsExpression(node)) {
    return {
      kind: 'ShapingAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      operator: 'as',
      value: parse(node.getExpression()) as abstracts.translators.StateAstType,
    };
  }
  if (Node.isSpreadElement(node)) {
    return {
      kind: 'SpreadAst',
      syntaxLayer: 2,
      value: parse(node.getExpression()) as abstracts.translators.StateAstType,
    };
  }
  if (Node.isAwaitExpression(node)) {
    return {
      kind: 'AwaitAst',
      syntaxLayer: 2,
      value: parse(node.getExpression()) as abstracts.translators.StateAstType,
    };
  }
  if (Node.isNonNullExpression(node)) {
    return parse(node.getExpression());
  }
  if (Node.isTemplateExpression(node)) {
    return {
      kind: 'TemplateAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      values: node.getTemplateSpans().map((s) => parse(s.getExpression())),
    } as abstracts.translators.TemplateAst;
  }
  if (Node.isThisExpression(node)) {
    return {
      kind: 'LiteralAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      value: node.getText(),
    };
  }
  if (Node.isYieldExpression(node)) {
    return {
      kind: 'YieldAst',
      syntaxLayer: 2,
      value: {
        kind: 'LiteralAst',
        syntaxLayer: 2,
        semanticLayer: 1,
        value: node.getText(),
      }
    };
  }
  if (Node.isSatisfiesExpression(node)) {
    return {
      kind: 'YieldAst',
      syntaxLayer: 2,
      value: {
        kind: 'LiteralAst',
        syntaxLayer: 2,
        semanticLayer: 1,
        value: node.getText(),
      }
    };
  }
  if (Node.isUnaryExpression(node)) return tsRl.ast.expressions.parseUnary(node);
  if (Node.isBinaryExpression(node)) return tsRl.ast.expressions.parseBinary(node);


  throw new tsRl.ast.UnknownNodeException(node);
}
