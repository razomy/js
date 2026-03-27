import { PropertySignature as TsPropertySignature, PropertyDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseType } from "../types/parse_type";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseExpression} from "../expressions";

export function parsePropertyDeclaration(node: TsPropertySignature | PropertyDeclaration): abstracts.translators.PropertyDeclaration {
  return {
    kind: 'PropertyDeclaration',
    isPublic: true,
    identifier: parseIdentifier(node.getNameNode()),
    type: node.getTypeNode() ? parseType(node.getTypeNode()!): null,
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    isOptional: node.hasQuestionToken(),
    isReadonly: node.isReadonly(),
    description: parseDescription(node.getNameNode()),
  };
}
