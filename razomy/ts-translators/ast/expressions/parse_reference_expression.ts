import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseReferenceExpression(node: TsIdentifier | Node): abstracts.translators.ReferenceExpression {
  return {
    kind: 'ReferenceExpression',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node),
  };
}
