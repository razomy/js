import { TypeAliasDeclaration as TsTypeAliasDeclaration } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseShape } from "../shapes/parse";

export function parseAlias(node: TsTypeAliasDeclaration): translators.AliasAst {
  return {
    kind: 'AliasAst',
    syntaxLayer: 3,
    identifier: { name: node.getName() },
    value: parseShape(node.getTypeNode()!) as translators.StateAstType,
    modifiers: []
  };
}
