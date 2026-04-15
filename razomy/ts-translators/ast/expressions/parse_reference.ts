import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseReference(node: TsIdentifier | Node): abstracts.translators.ReferenceExpression {
  return {
    kind: 'ReferenceExpression',
    modifiers: [],
    identifier: tsTranslators.ast.bindings.parseIdentifier(node),
  };
}
