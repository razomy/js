import { VariableDeclaration as TsVariableDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseType } from "../types/parse_type";
import { parseExpression } from "../expressions/parse_expression";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";

export function parseVariableDeclaration(node: TsVariableDeclaration): abstracts.translators.VariableDeclaration {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer() ? parseExpression(node.getInitializer()!) : null;
  const type =  node.getTypeNode() ? parseType(node.getTypeNode()!) : null;

  return {
    kind: 'VariableDeclaration',
    isPublic: node.isExported(),
    identifier: parseIdentifier(node.getNameNode()),
    isConst: isConst,
    type,
    expression,
    description: parseDescription(node.getNameNode()),
  };
}
