import { ClassDeclaration } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseClass(node: ClassDeclaration): abstracts.translators.ClassAst {
  return {
    kind: 'ClassAst', syntaxLayer: 3,
    identifier: { name: node.getName() || 'Anonymous' },
    modifiers: [],
    parameters: [],
    properties: node.getProperties().map(tsRl.ast.bindings.parseProperty),
    methods: [] // TODO:Требуется парсинг методов аналогично функциям
  };
}
