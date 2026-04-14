import {VariableDeclaration as TsVariableDeclaration} from "ts-morph";
import {parseIdentifier} from "./parse_identifier";
import {parseExpression} from "../expressions/parse_expression";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";


export function parseVariableBinding(node: TsVariableDeclaration): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer() ? parseExpression(node.getInitializer()!) : null;
  let shapeIdentifier = node.getTypeNode() ? parseShapeIdentifier(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: parseIdentifier(node.getNameNode()),
      shapeIdentifier,
      meta: {description: parseDescription(node.getNameNode()),}
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' : null].filter(i => i != null) as abstracts.translators.Modifier[],
    shapeIdentifier,
    expression,
    meta: {description: parseDescription(node.getNameNode()),}
  };
}
