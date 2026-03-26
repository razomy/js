import { Node } from "ts-morph";
import { parseStringExpression } from "./parse_string_expression";
import { parseNumberExpression } from "./parse_number_expression";
import { parseBooleanExpression } from "./parse_boolean_expression";
import { parseNullExpression } from "./parse_null_expression";
import { parseUndefinedExpression } from "./parse_undefined_expression";
import { parseBigIntExpression } from "./parse_big_int_expression";
import { parseRegExpExpression } from "./parse_reg_exp_expression";
import { parseArrayExpression } from "./parse_array_expression";
import * as abstracts from "@razomy/abstracts";

export function parseExpression(node: Node): abstracts.ast.ExpressionType | null {
  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return parseStringExpression(node);
  }
  if (Node.isNumericLiteral(node)) {
    return parseNumberExpression(node);
  }
  if (Node.isBooleanKeyword(node) || Node.isTrueLiteral(node) || Node.isFalseLiteral(node)) {
    return parseBooleanExpression(node as any);
  }
  if (Node.isNullLiteral(node)) {
    return parseNullExpression(node);
  }
  if (Node.isIdentifier(node) && node.getText() === 'undefined') {
    return parseUndefinedExpression(node);
  }
  if (Node.isBigIntLiteral(node)) {
    return parseBigIntExpression(node);
  }
  if (Node.isRegularExpressionLiteral(node)) {
    return parseRegExpExpression(node);
  }
  if (Node.isArrayLiteralExpression(node)) {
    return parseArrayExpression(node);
  }
  return null;
}
