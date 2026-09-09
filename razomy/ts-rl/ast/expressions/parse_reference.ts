import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseReference(node: TsIdentifier | Node): abstracts.translators.ReferenceExpression {
  return {
    kind: 'ReferenceExpression',
    modifiers: [],
    identifier: tsRl.ast.bindings.parseIdentifier(node),
  };
}
