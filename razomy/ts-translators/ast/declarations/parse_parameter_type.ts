import {FunctionDeclaration, ParameterDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseTypeIdentifier} from "../base";
import {parseType} from "../types";

export function parseParameterType(node: ParameterDeclaration): abstracts.translators.PropertyType {
  let description = '';
  const jsDocs = (node.getParent() as FunctionDeclaration)?.getJsDocs?.();
  if (jsDocs && jsDocs.length > 0) {
    const paramTag = jsDocs[0].getTags().find(t => t.getTagName() === 'param' && t.getText().includes(node.getName()));
    if (paramTag) {
      description = paramTag.getCommentText()?.replace(/^-\s*/, '').trim() || '';
    }
  }

  return {
    kind: 'PropertyType',
    type: parseType(node.getTypeNode()!),
    typeIdentifier: parseTypeIdentifier(node.getNameNode()!),
    description,
  };
}
