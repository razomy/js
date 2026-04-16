import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsLang from "../..";

export function parseReference(node: TsIdentifier | Node): abstracts.translators.ReferenceExpression {
  return {
    kind: 'ReferenceExpression',
    modifiers: [],
    identifier: tsLang.ast.bindings.parseIdentifier(node),
  };
}
