import {ClassDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseClass(node: ClassDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ClassAst {
  return {
    kind: 'ClassAst',
    syntaxRole: 'statement',
    identifier: {name: node.getName() || 'Anonymous'},
    modifiers: [],
    parameters: [],
    properties: [
      ...node.getProperties(),
      ...node.getMethods()
    ].map(i=>tsRl.ast.bindings.parse(i,ctx))
      .flat() as (abstracts.translators.PropertyAst | abstracts.translators.FunctionAst)[],
  };
}
