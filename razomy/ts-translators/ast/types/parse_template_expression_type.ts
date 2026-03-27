import { TemplateLiteralTypeNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseTemplateExpressionType(node: TemplateLiteralTypeNode): abstracts.translators.TemplateExpression {
  return {
    kind: 'TemplateExpression',
    template: node.getHead().getLiteralText(),
    expressions: node.getTemplateSpans().map(span => span.getText()) as any // TODO:,
  };
}
