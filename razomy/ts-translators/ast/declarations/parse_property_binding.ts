import { PropertySignature as TsPropertySignature, PropertyDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseExpression} from "../expressions";
import {parseTypeIdentifier} from "../base";

export function parsePropertyBinding(node: TsPropertySignature | PropertyDeclaration): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: parseIdentifier(node.getNameNode()),
    typeIdentifier: node.getTypeNode() ? parseTypeIdentifier(node.getTypeNode()!): null,
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    isOptional: node.hasQuestionToken(),
    isReadonly: node.isReadonly(),
    description: parseDescription(node.getNameNode()),
  };
}
