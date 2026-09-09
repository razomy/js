import { ClassDeclaration } from "ts-morph";
import * as translators from '@razomy/abstracts/translators';
import { parseProperty } from "../bindings/parse_property";

export function parseClass(node: ClassDeclaration): translators.ClassAst {
  return {
    kind: 'ClassAst', syntaxLayer: 3,
    identifier: { name: node.getName() || 'Anonymous' },
    modifiers: [],
    parameters: [],
    properties: node.getProperties().map(parseProperty),
    methods: [] // TODO:Требуется парсинг методов аналогично функциям
  };
}
