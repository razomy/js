import {ClassDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseClass(node: ClassDeclaration): abstracts.translators.ClassAst {
  return {
    kind: 'ClassAst', syntaxLayer: 3,
    identifier: {name: node.getName() || 'Anonymous'},
    modifiers: [],
    parameters: [],
    properties: [
      ...node.getProperties(),
      ...node.getMethods()
    ].map(tsRl.ast.bindings.parse)
      .flat() as (abstracts.translators.PropertyAst | abstracts.translators.FunctionAst)[],
  };
}
