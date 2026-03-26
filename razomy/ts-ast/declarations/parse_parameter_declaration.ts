import { ParameterDeclaration, FunctionDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseType } from "../types/parse_type";
import * as abstracts from "@razomy/abstracts";
import {parseExpression} from "../expressions";

export function parseParameterDeclaration(node: ParameterDeclaration): abstracts.ast.ParameterDeclaration {
  let description = '';
  const jsDocs = (node.getParent() as FunctionDeclaration)?.getJsDocs?.();
  if (jsDocs && jsDocs.length > 0) {
    const paramTag = jsDocs[0].getTags().find(t => t.getTagName() === 'param' && t.getText().includes(node.getName()));
    if (paramTag) {
      description = paramTag.getCommentText()?.replace(/^-\s*/, '').trim() || '';
    }
  }

  return {
    kind: 'ParameterDeclaration',
    isPublic: true,
    identifier: parseIdentifier(node.getNameNode()),
    type: node.getTypeNode() ? parseType(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    isRest: node.isRestParameter(),
    description,
  };
}
