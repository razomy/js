import {ParameterDeclaration} from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import {parse as parseExpr} from "../expressions/parse";
import {parse as parseShape} from "../shapes/parse";

export function parseParameter(node: ParameterDeclaration): translators.ParameterAst {
  return {
    kind: 'ParameterAst',
    syntaxLayer: 3,
    identifier: {name: node.getName()},
    shape: node.getTypeNode() ? parseShape(node.getTypeNode()!) : null,
    value: node.getInitializer() ? parseExpr(node.getInitializer()!) as translators.StateAstType : null,
    modifiers: node.isRestParameter() ? [{
      kind: 'ParameterModifierAst',
      syntaxLayer: 1,
      operator: 'rest',
      value: null
    }] : [],
  };
}
