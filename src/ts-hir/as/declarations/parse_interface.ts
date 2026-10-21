import { InterfaceDeclaration as TsInterfaceDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseInterface(node: TsInterfaceDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.InterfaceAsn {
  const interfaceAsn: abstractions.translator.InterfaceAsn = {
    id: random.createUuid(),
    kind: 'InterfaceAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [
      node.isExported() ? { id: random.createUuid(), kind: 'AccessModifierAsn', syntaxRole: 'modifier', operator: 'public', value: null } : null,
    ].filter(Boolean) as abstractions.translator.AccessModifierAsn[],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(interfaceAsn, node)) {
    return interfaceAsn;
  }

  interfaceAsn.properties = node.getProperties().map(i => tsHir.as.shapes.parse(i, ctx)) as abstractions.translator.PropertyAsn[];

  return ctx.leave(interfaceAsn, node);
}
