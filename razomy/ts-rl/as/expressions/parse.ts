import { Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parse(node: Node, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.AsnType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node))
    return tsRl.as.expressions.buildIn.parseString(node, ctx);
  if (Node.isNumericLiteral(node)) return tsRl.as.expressions.buildIn.parseNumber(node, ctx);
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node))
    return tsRl.as.expressions.buildIn.parseBoolean(node as any, ctx);
  if (Node.isNullLiteral(node)) return tsRl.as.expressions.buildIn.parseNull(node, ctx);
  if (Node.isIdentifier(node) && node.getText() === 'undefined')
    return tsRl.as.expressions.buildIn.parseUndefined(node, ctx);
  if (Node.isBigIntLiteral(node)) return tsRl.as.expressions.buildIn.parseBigInt(node, ctx);
  if (Node.isRegularExpressionLiteral(node)) return tsRl.as.expressions.buildIn.parseRegExp(node, ctx);
  if (Node.isArrayLiteralExpression(node)) return tsRl.as.expressions.buildIn.parseArray(node, ctx);
  if (Node.isObjectLiteralExpression(node)) {
    const objAsn: abstractions.translators.ObjectAsn = {
      id: random.createUuid(),
      kind: 'ObjectAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      properties: [],
    };
    if (!ctx.enter(objAsn, node)) return objAsn;
    return ctx.leave(objAsn, node);
  }
  if (Node.isBinaryExpression(node)) return tsRl.as.expressions.parseBinary(node, ctx);
  if (Node.isCallExpression(node)) return tsRl.as.expressions.parseCall(node, ctx);
  if (
    Node.isPrefixUnaryExpression(node) ||
    Node.isPostfixUnaryExpression(node) ||
    Node.isTypeOfExpression(node) ||
    Node.isDeleteExpression(node)
  )
    return tsRl.as.expressions.parseUnary(node, ctx);
  if (Node.isParenthesizedExpression(node)) return parse(node.getExpression(), ctx);
  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node))
    return tsRl.as.expressions.parseMember(node, ctx);
  if (Node.isNewExpression(node)) return tsRl.as.expressions.parseNew(node, ctx);
  if (Node.isArrowFunction(node)) return tsRl.as.expressions.parseArrowFunction(node, ctx);
  if (Node.isFunctionExpression(node)) return tsRl.as.expressions.parseunctionExpression(node, ctx);
  if (Node.isConditionalExpression(node)) return tsRl.as.expressions.parseCondition(node, ctx);
  if (Node.isAsExpression(node)) {
    const shapeAsn: abstractions.translators.ShapingAsn = {
      id: random.createUuid(),
      kind: 'ShapingAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      operator: 'as',
      value: null as any,
    };
    if (!ctx.enter(shapeAsn, node)) return shapeAsn;
    shapeAsn.value = parse(node.getExpression(), ctx) as abstractions.translators.StateAsnType;
    return ctx.leave(shapeAsn, node);
  }
  if (Node.isSpreadElement(node)) {
    const spreadAsn: abstractions.translators.SpreadAsn = {
      id: random.createUuid(),
      kind: 'SpreadAsn',
      syntaxRole: 'expression',
      value: null as any,
    };
    if (!ctx.enter(spreadAsn, node)) return spreadAsn;
    spreadAsn.value = parse(node.getExpression(), ctx) as abstractions.translators.StateAsnType;
    return ctx.leave(spreadAsn, node);
  }
  if (Node.isAwaitExpression(node)) {
    const awaitAsn: abstractions.translators.AwaitAsn = {
      id: random.createUuid(),
      kind: 'AwaitAsn',
      syntaxRole: 'expression',
      value: null as any,
    };
    if (!ctx.enter(awaitAsn, node)) return awaitAsn;
    awaitAsn.value = parse(node.getExpression(), ctx) as abstractions.translators.StateAsnType;
    return ctx.leave(awaitAsn, node);
  }
  if (Node.isNonNullExpression(node)) {
    return parse(node.getExpression(), ctx);
  }
  if (Node.isTemplateExpression(node)) {
    const templateAsn: abstractions.translators.TemplateAsn = {
      id: random.createUuid(),
      kind: 'TemplateAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      values: [],
    };
    if (!ctx.enter(templateAsn, node)) return templateAsn;
    templateAsn.values = node.getTemplateSpans().map((s) => parse(s.getExpression(), ctx));
    return ctx.leave(templateAsn, node);
  }
  if (Node.isThisExpression(node)) {
    const thisAsn: abstractions.translators.LiteralAsn = {
      id: random.createUuid(),
      kind: 'LiteralAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      value: node.getText(),
    };
    if (!ctx.enter(thisAsn, node)) return thisAsn;
    return ctx.leave(thisAsn, node);
  }
  if (Node.isYieldExpression(node)) {
    const yieldAsn: abstractions.translators.YieldAsn = {
      id: random.createUuid(),
      kind: 'YieldAsn',
      syntaxRole: 'expression',
      value: {
        id: random.createUuid(),
        kind: 'LiteralAsn',
        syntaxRole: 'expression',
        semanticLayer: 'state',
        value: node.getText(),
      },
    };
    if (!ctx.enter(yieldAsn, node)) return yieldAsn;
    return ctx.leave(yieldAsn, node);
  }
  if (Node.isSatisfiesExpression(node)) {
    const satisfiesAsn: abstractions.translators.YieldAsn = {
      id: random.createUuid(),
      kind: 'YieldAsn',
      syntaxRole: 'expression',
      value: {
        id: random.createUuid(),
        kind: 'LiteralAsn',
        syntaxRole: 'expression',
        semanticLayer: 'state',
        value: node.getText(),
      },
    };
    if (!ctx.enter(satisfiesAsn, node)) return satisfiesAsn;
    return ctx.leave(satisfiesAsn, node);
  }
  if (Node.isIdentifier(node)) return tsRl.as.expressions.parseReference(node, ctx);
  if (Node.isUnaryExpression(node)) return tsRl.as.expressions.parseUnary(node, ctx);

  throw new tsRl.as.UnknownNodeException(node);
}
