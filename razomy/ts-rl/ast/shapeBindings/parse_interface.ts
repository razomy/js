import { InterfaceDeclaration as TsInterfaceDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseInterface(node: TsInterfaceDeclaration): abstracts.translators.InterfaceAst {
  return {
    kind: 'InterfaceAst', syntaxLayer: 3,
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getProperties().map(tsRl.ast.bindings.parseProperty) as abstracts.translators.PropertyAst[],
  };
}
