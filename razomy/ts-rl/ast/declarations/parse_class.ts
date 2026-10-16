import { ClassDeclaration } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseClass(node: ClassDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ClassAsn {
  const classAsn: abstractions.translators.ClassAsn = {
    id: random.createUuid(),
    kind: 'ClassAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() || 'Anonymous' },
    modifiers: [],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(classAsn, node)) {
    return classAsn;
  }

  classAsn.properties = [
    ...node.getProperties(),
    ...node.getMethods()
  ].map(i => tsRl.ast.bindings.parse(i, ctx))
    .flat() as (abstractions.translators.PropertyAsn | abstractions.translators.FunctionAsn)[];

  return ctx.leave(classAsn, node);
}