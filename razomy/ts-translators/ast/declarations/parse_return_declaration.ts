import { FunctionDeclaration, MethodDeclaration } from "ts-morph";
import { parseType } from "../types/parse_type";
import * as abstracts from "@razomy/abstracts";

export function parseReturnDeclaration(node: FunctionDeclaration | MethodDeclaration): abstracts.translators.ReturnDeclaration {
  let description:string = '';

  const jsDocs = node.getJsDocs();
  if (jsDocs.length > 0) {
    const returnTag = jsDocs[0].getTags().find(t => t.getTagName() === 'returns');
    if (returnTag) {
      description = returnTag.getCommentText()?.trim() || '';
    }
  }

  return {
    kind: 'ReturnDeclaration',
    isPublic: true,
    type: node.getReturnTypeNode() ? parseType(node.getReturnTypeNode()!) : null,
    description,
    identifier: { name: 'return', kind: 'Identifier' },
  };
}
