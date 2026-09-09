import { InterfaceDeclaration as TsInterfaceDeclaration } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseProperty } from "../bindings/parse_property";

export function parseInterface(node: TsInterfaceDeclaration): translators.InterfaceAst {
  return {
    kind: 'InterfaceAst', syntaxLayer: 3,
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getProperties().map(parseProperty) as translators.PropertyAst[],
  };
}
