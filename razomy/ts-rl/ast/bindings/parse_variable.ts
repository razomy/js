import { VariableDeclaration as TsVariableDeclaration, Node } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from "../expressions/parse";
import { parse as parseShape } from "../shapes/parse";

export function parseVariable(node: TsVariableDeclaration): translators.InstanceAst {
  // FIX: In a `for` loop, there is no VariableStatement. We check the parent List instead.
  const parent = node.getParent();
  const isConst = Node.isVariableDeclarationList(parent)
    ? parent.getDeclarationKind() === 'const'
    : node.getVariableStatement()?.getDeclarationKind() === 'const';

  return {
    kind: 'InstanceAst',
    syntaxLayer: 3,
    modifiers: isConst ? [{ kind: 'InstanceModifierAst', syntaxLayer: 1, operator: 'const', value: null }] : [],
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? parseShape(node.getTypeNode()!) : null,
    value: node.getInitializer() ? parseExpr(node.getInitializer()!) as translators.StateAstType : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: undefined },
  };
}
