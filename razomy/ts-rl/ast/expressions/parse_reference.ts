import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseReference(node: TsIdentifier | Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ReferenceAsn {
  return { kind: 'ReferenceAsn', syntaxRole: 'expression', identifier: { name: node.getText() } };
}
