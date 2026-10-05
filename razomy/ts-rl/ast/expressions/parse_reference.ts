import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseReference(node: TsIdentifier | Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ReferenceAsn {
  return { kind: 'ReferenceAsn', syntaxRole: 'expression', identifier: { name: node.getText() } };
}
