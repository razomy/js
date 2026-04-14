import {FunctionDeclaration, ParameterDeclaration} from "ts-morph";
import {parseIdentifier} from "./parse_identifier";
import * as abstracts from "@razomy/abstracts";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";
import {parseExpression} from "../expressions";

export function parseParameterDeclaration(node: ParameterDeclaration): abstracts.translators.ParameterBinding {
  let description = '';
  const jsDocs = (node.getParent() as FunctionDeclaration)?.getJsDocs?.();
  if (jsDocs && jsDocs.length > 0) {
    const paramTag = jsDocs[0].getTags().find(t => t.getTagName() === 'param' && t.getText().includes(node.getName()));
    if (paramTag) {
      description = paramTag.getCommentText()?.replace(/^-\s*/, '').trim() || '';
    }
  }

  return {
    kind: 'ParameterBinding',
    identifier: parseIdentifier(node.getNameNode()),
    shapeIdentifier: node.getTypeNode() ? parseShapeIdentifier(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    isRest: node.isRestParameter(),
    meta: {description}
  };
}

