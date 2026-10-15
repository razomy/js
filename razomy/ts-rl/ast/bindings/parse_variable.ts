import { Node, VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseVariable(
  node: TsVariableDeclaration,
  ctx: tsRl.ast.HasEnterLeaveProduce,
): abstractions.translators.InstanceAsn {
  // FIX: In a `for` loop, there is no VariableStatement. We check the parent List instead.
  const parent = node.getParent();
  const isConst = Node.isVariableDeclarationList(parent)
    ? parent.getDeclarationKind() === 'const'
    : node.getVariableStatement()?.getDeclarationKind() === 'const';

  return ctx.leave({
    kind: 'InstanceAsn',
    syntaxRole: 'statement',
    modifiers: isConst ? [{ kind: 'InstanceModifierAsn', syntaxRole: 'modifier', operator: 'const', value: null }] : [],
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer()
      ? (tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType)
      : { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: undefined },
  }, node);
}
