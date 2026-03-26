import { StringLiteral, NoSubstitutionTemplateLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseStringExpression(node: StringLiteral | NoSubstitutionTemplateLiteral): abstracts.ast.StringExpression {
  return {
    kind: 'StringExpression',
    value: node.getLiteralValue(),
  };
}
