import { InterfaceDeclaration as TsInterfaceDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseInterface(node: TsInterfaceDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.InterfaceAsn {
  return {
    kind: 'InterfaceAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getProperties().map(i=>tsRl.ast.shapes.parse(i,ctx)) as abstracts.translators.PropertyAsn[],
  };
}
