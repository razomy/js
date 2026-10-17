import { InterfaceDeclaration as TsInterfaceDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseInterface(node: TsInterfaceDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.InterfaceAsn {
  const interfaceAsn: abstractions.translators.InterfaceAsn = {
    id: random.createUuid(),
    kind: 'InterfaceAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(interfaceAsn, node)) {
    return interfaceAsn;
  }

  interfaceAsn.properties = node.getProperties().map(i => tsRl.ast.shapes.parse(i, ctx)) as abstractions.translators.PropertyAsn[];

  return ctx.leave(interfaceAsn, node);
}