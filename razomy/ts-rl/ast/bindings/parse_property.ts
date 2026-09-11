import {PropertyDeclaration, PropertySignature as TsPropertySignature} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseProperty(node: TsPropertySignature | PropertyDeclaration): abstracts.translators.PropertyAst {
  return {
    kind: 'PropertyAst', syntaxLayer: 2, semanticLayer: 1,
    identifier: {name: node.getName()},
    value: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : {
      kind: 'LiteralAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      value: null
    },
  };
}
