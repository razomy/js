import { TemplateLiteralTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseTemplateShape(node: TemplateLiteralTypeNode): abstracts.translators.TemplateShape {
  return {
    kind: 'TemplateShape',
    template: node.getHead().getLiteralText(),
    shapes: node.getTemplateSpans().map((span) => span.getText()) as any, // TODO:,
  };
}
