import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRala from "@razomy/ts-rala";

export function parseReference(node: TsIdentifier | Node): abstracts.translators.ReferenceExpression {
  return {
    kind: 'ReferenceExpression',
    modifiers: [],
    identifier: tsRala.ast.bindings.parseIdentifier(node),
  };
}
