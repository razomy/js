import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.AsnType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node))
    return tsRl.ast.expressions.buildIn.parseString(node, ctx);
  if (Node.isNumericLiteral(node)) return tsRl.ast.expressions.buildIn.parseNumber(node, ctx);
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node))
    return tsRl.ast.expressions.buildIn.parseBoolean(node as any, ctx);
  if (Node.isNullLiteral(node)) return tsRl.ast.expressions.buildIn.parseNull(node, ctx);
  if (Node.isIdentifier(node) && node.getText() === 'undefined')
    return tsRl.ast.expressions.buildIn.parseUndefined(node, ctx);
  if (Node.isBigIntLiteral(node)) return tsRl.ast.expressions.buildIn.parseBigInt(node, ctx);
  if (Node.isRegularExpressionLiteral(node)) return tsRl.ast.expressions.buildIn.parseRegExp(node, ctx);
  if (Node.isArrayLiteralExpression(node)) return tsRl.ast.expressions.buildIn.parseArray(node, ctx);
  if (Node.isObjectLiteralExpression(node)) {
    return { kind: 'ObjectAsn', syntaxRole: 'expression', semanticLayer: 'state', properties: [] }; // Expand as needed
  }
  if (Node.isIdentifier(node)) {
    return {
      kind: 'LiteralAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      value: node.getText(),
    };
  }
  if (Node.isBinaryExpression(node)) {
    return {
      kind: 'BinaryAsn',
      syntaxRole: 'statement',
      operator: node.getOperatorToken() as any,
      left: tsRl.ast.expressions.parse(node.getLeft(), ctx),
      right: tsRl.ast.expressions.parse(node.getRight(), ctx),
    };
  }
  if (Node.isCallExpression(node)) return tsRl.ast.expressions.parseCall(node, ctx);
  if (
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
  )
    return tsRl.ast.expressions.parseUnary(node, ctx);
  if (Node.isParenthesizedExpression(node)) return parse(node.getExpression(), ctx);
  if (Node.isIdentifier(node)) return tsRl.ast.expressions.parseReference(node, ctx);
  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node))
    return tsRl.ast.expressions.parseMember(node, ctx);
  if (Node.isNewExpression(node)) return tsRl.ast.expressions.parseNew(node, ctx);
  if (Node.isCallExpression(node)) return tsRl.ast.expressions.parseCall(node, ctx);
  if (Node.isArrowFunction(node)) return tsRl.ast.expressions.parseArrowFunction(node, ctx);
  if (Node.isFunctionExpression(node)) return tsRl.ast.expressions.parseunctionExpression(node, ctx);
  if (Node.isConditionalExpression(node)) return tsRl.ast.expressions.parseCondition(node, ctx);
  if (Node.isAsExpression(node)) {
    return {
      kind: 'ShapingAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      operator: 'as',
      value: parse(node.getExpression(), ctx) as abstracts.translators.StateAsnType,
    };
  }
  if (Node.isSpreadElement(node)) {
    return {
      kind: 'SpreadAsn',
      syntaxRole: 'expression',
      value: parse(node.getExpression(), ctx) as abstracts.translators.StateAsnType,
    };
  }
  if (Node.isAwaitExpression(node)) {
    return {
      kind: 'AwaitAsn',
      syntaxRole: 'expression',
      value: parse(node.getExpression(), ctx) as abstracts.translators.StateAsnType,
    };
  }
  if (Node.isNonNullExpression(node)) {
    return parse(node.getExpression(), ctx);
  }
  if (Node.isTemplateExpression(node)) {
    return {
      kind: 'TemplateAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      values: node.getTemplateSpans().map((s) => parse(s.getExpression(), ctx)),
    } as abstracts.translators.TemplateAsn;
  }
  if (Node.isThisExpression(node)) {
    return {
      kind: 'LiteralAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      value: node.getText(),
    };
  }
  if (Node.isYieldExpression(node)) {
    return {
      kind: 'YieldAsn',
      syntaxRole: 'expression',
      value: {
        kind: 'LiteralAsn',
        syntaxRole: 'expression',
        semanticLayer: 'state',
        value: node.getText(),
      }
    };
  }
  if (Node.isSatisfiesExpression(node)) {
    return {
      kind: 'YieldAsn',
      syntaxRole: 'expression',
      value: {
        kind: 'LiteralAsn',
        syntaxRole: 'expression',
        semanticLayer: 'state',
        value: node.getText(),
      }
    };
  }
  if (Node.isUnaryExpression(node)) return tsRl.ast.expressions.parseUnary(node, ctx);
  if (Node.isBinaryExpression(node)) return tsRl.ast.expressions.parseBinary(node,ctx);


  throw new tsRl.ast.UnknownNodeException(node);
}
