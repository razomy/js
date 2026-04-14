import { Node } from "ts-morph";
import { parseStringExpression } from "./build_in/parse_string_expression";
import { parseNumberExpression } from "./build_in/parse_number_expression";
import { parseBooleanExpression } from "./build_in/parse_boolean_expression";
import { parseNullExpression } from "./build_in/parse_null_expression";
import { parseUndefinedExpression } from "./build_in/parse_undefined_expression";
import { parseBigIntExpression } from "./build_in/parse_big_int_expression";
import { parseRegExpExpression } from "./build_in/parse_reg_exp_expression";
import { parseArrayExpression } from "./build_in/parse_array_expression";
import * as abstracts from "@razomy/abstracts";

export function parseExpression(node: Node): abstracts.translators.ExpressionType | null {
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
