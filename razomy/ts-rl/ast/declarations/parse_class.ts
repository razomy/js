import {ClassDeclaration} from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseClass(node: ClassDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ClassAsn {
  return {
    kind: 'ClassAsn',
    syntaxRole: 'statement',
    identifier: {name: node.getName() || 'Anonymous'},
    modifiers: [],
    parameters: [],
    properties: [
      ...node.getProperties(),
      ...node.getMethods()
    ].map(i=>tsRl.ast.bindings.parse(i,ctx))
      .flat() as (abstractions.translators.PropertyAsn | abstractions.translators.FunctionAsn)[],
  };
}
