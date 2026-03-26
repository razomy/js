import { TemplateLiteralTypeNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseTemplateTypeType(node: TemplateLiteralTypeNode): abstracts.ast.TemplateType {
    return {
    kind: 'TemplateType',
    template: node.getHead().getLiteralText(),
    types: node.getTemplateSpans().map(span => span.getText()) as any // TODO:,
    };
}
