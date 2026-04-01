import {VariableDeclaration as TsVariableDeclaration} from "ts-morph";
import {parseIdentifier} from "../base/parse_identifier";
import {parseExpression} from "../expressions/parse_expression";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseTypeIdentifier} from "../base";
import {parseTypeIdentifierFromType} from "../base/parse_type_identifier_from_type";


export function parseVariableDeclaration(node: TsVariableDeclaration): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer() ? parseExpression(node.getInitializer()!) : null;
  let typeIdentifier = node.getTypeNode() ? parseTypeIdentifier(node.getTypeNode()!) : null;

  if (!typeIdentifier) {
    typeIdentifier = parseTypeIdentifierFromType(node);
  }

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: parseIdentifier(node.getNameNode()),
      typeIdentifier,
      description: parseDescription(node.getNameNode()),
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: parseIdentifier(node.getNameNode()),
    isConst: isConst,
    typeIdentifier,
    expression,
    description: parseDescription(node.getNameNode()),
  };
}
