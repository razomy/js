import { Node } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import * as buildIn from './build_in';
import { parseBinary } from './parse_binary';
import { parseUnary } from './parse_unary';
import { parseMember } from './parse_member';
import { parseCall } from './parse_call';
import { parseNew } from './parse_new';
import { parseReference } from './parse_reference';
import { parseCondition } from './parse_condition';
import { parseArrowFunction } from './parse_arrow_function';

export function parse(node: Node): translators.AstType {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) return buildIn.parseString(node);
  if (Node.isNumericLiteral(node)) return buildIn.parseNumber(node);
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node)) return buildIn.parseBoolean(node as any);
  if (Node.isNullLiteral(node)) return buildIn.parseNull(node);
  if (Node.isIdentifier(node) && node.getText() === 'undefined') return buildIn.parseUndefined(node);
  if (Node.isBigIntLiteral(node)) return buildIn.parseBigInt(node);
  if (Node.isRegularExpressionLiteral(node)) return buildIn.parseRegExp(node);
  if (Node.isArrayLiteralExpression(node)) return buildIn.parseArray(node);
  if (Node.isObjectLiteralExpression(node)) {
    return { kind: 'ObjectAst', syntaxLayer: 2, semanticLayer: 1, properties: [] }; // Expand as needed
  }
  if (Node.isBinaryExpression(node)) return parseBinary(node);
  if (Node.isPrefixUnaryExpression(node) || Node.isPostfixUnaryExpression(node) || Node.isTypeOfExpression(node) || Node.isDeleteExpression(node)) return parseUnary(node);
  if (Node.isParenthesizedExpression(node)) return parse(node.getExpression());
  if (Node.isIdentifier(node)) return parseReference(node);
  if (Node.isPropertyAccessExpression(node) || Node.isElementAccessExpression(node)) return parseMember(node);
  if (Node.isNewExpression(node)) return parseNew(node);
  if (Node.isCallExpression(node)) return parseCall(node);
  if (Node.isArrowFunction(node)) return parseArrowFunction(node);
  if (Node.isConditionalExpression(node)) return parseCondition(node);
  if (Node.isAsExpression(node)) {
    return {
      kind: 'ShapingAst', syntaxLayer: 2, semanticLayer: 1,
      operator: 'as', value: parse(node.getExpression()) as translators.StateAstType
    } as translators.ShapingAst;
  }
  if (Node.isTemplateExpression(node)) {
    return { kind: 'TemplateAst', syntaxLayer: 2, semanticLayer: 1, values: node.getTemplateSpans().map(s => parse(s.getExpression())) } as translators.TemplateAst;
  }
  throw new Error(`Unrecognized expression: "${node.getText()}": ${node.getKindName()}`);
}
