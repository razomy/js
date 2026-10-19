import { ClassDeclaration } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";
import type {ModifierAsnTypes} from "@razomy/abstractions/translator";

export function parseClass(node: ClassDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.ClassAsn {
  const classAsn: abstractions.translator.ClassAsn = {
    id: random.createUuid(),
    kind: 'ClassAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() || 'Anonymous' },
    modifiers: [
      node.isExported() ? { id: random.createUuid(), kind: 'AccessModifierAsn', syntaxRole: 'modifier', operator: 'public', value: null } : null,
    ].filter(Boolean) as ModifierAsnTypes[],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(classAsn, node)) {
    return classAsn;
  }

  classAsn.properties = [
    ...node.getProperties(),
    ...node.getMethods()
  ].map(i => tsRl.as.bindings.parse(i, ctx))
    .flat() as (abstractions.translator.PropertyAsn | abstractions.translator.FunctionAsn)[];

  return ctx.leave(classAsn, node);
}
