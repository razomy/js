import {PropertyDeclaration, PropertySignature as TsPropertySignature} from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import {parse as parseShape} from "../shapes/parse";

export function parseProperty(node: TsPropertySignature | PropertyDeclaration): translators.PropertyAst {
  return {
    kind: 'PropertyAst', syntaxLayer: 2, semanticLayer: 1,
    identifier: {name: node.getName()},
    value: node.getTypeNode() ? parseShape(node.getTypeNode()!) : {
      kind: 'LiteralAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      value: null
    },
  };
}
