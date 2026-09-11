import { Node } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parse(node: Node): abstracts.translators.AstType {
  if (Node.isTypeReference(node)) {
    return { kind: 'ReferenceAst', syntaxLayer: 2, identifier: { name: node.getTypeName().getText() } } as abstracts.translators.ReferenceAst;
  }
  if (Node.isArrayTypeNode(node)) {
    return { kind: 'ArrayAst', syntaxLayer: 2, semanticLayer: 2, values: [parse(node.getElementTypeNode())] } as abstracts.translators.ArrayAst;
  }
  if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    return { kind: 'TupleAst', syntaxLayer: 2, semanticLayer: 2, values: node.getTypeNodes().map(parse) } as abstracts.translators.TupleAst;
  }
  if (Node.isTypeLiteral(node)) {
    return { kind: 'ObjectAst', syntaxLayer: 2, semanticLayer: 2, properties: [] } as abstracts.translators.ObjectAst;
  }
  
  const kind = node.getKindName();
  if (kind.includes('Keyword')) {
    return { kind: 'ReferenceAst', syntaxLayer: 2, identifier: { name: node.getText() } } as abstracts.translators.ReferenceAst;
  }

  // Fallback
  return { kind: 'ReferenceAst', syntaxLayer: 2, identifier: { name: node.getText() } } as abstracts.translators.ReferenceAst;
}
