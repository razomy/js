import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseReference(node: TsIdentifier | Node): abstracts.translators.ReferenceAst {
  return { kind: 'ReferenceAst', syntaxLayer: 2, identifier: { name: node.getText() } };
}
