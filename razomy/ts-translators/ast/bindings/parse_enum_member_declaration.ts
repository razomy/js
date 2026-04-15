import {EnumMember} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseEnumMemberDeclaration(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? tsTranslators.ast.expressions.parseExpression(node.getInitializer()!) : null,
    meta: {
      description: tsTranslators.ast.doc.parseDescription(node.getNameNode()),
    }
  };
}
