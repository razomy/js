import {PropertyDeclaration, PropertySignature as TsPropertySignature} from "ts-morph";
import {parseIdentifier} from "./parse_identifier";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";
import {parseExpression} from "../expressions";

export function parsePropertyBinding(node: TsPropertySignature | PropertyDeclaration): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: parseIdentifier(node.getNameNode()),
    shapeIdentifier: node.getTypeNode() ? parseShapeIdentifier(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    modifiers: [
      node.hasQuestionToken() ? 'optional' : null,
      node.isReadonly() ? 'readonly' : null,
    ].filter(i => i != null) as abstracts.translators.Modifier[],
    meta: {description: parseDescription(node.getNameNode()),}
  };
}
