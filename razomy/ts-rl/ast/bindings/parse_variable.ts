import { Node, VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseVariable(
  node: TsVariableDeclaration,
  ctx: tsRl.ast.HasEnterLeaveProduce,
): abstractions.translators.InstanceAsn {
  const parent = node.getParent();
  const isConst = Node.isVariableDeclarationList(parent)
    ? parent.getDeclarationKind() === 'const'
    : node.getVariableStatement()?.getDeclarationKind() === 'const';

  const instanceAsn: abstractions.translators.InstanceAsn = {
    id: random.createUuid(),
    kind: 'InstanceAsn',
    syntaxRole: 'statement',
    modifiers: isConst ? [{ id: random.createUuid(), kind: 'InstanceModifierAsn', syntaxRole: 'modifier', operator: 'const', value: null }] : [],
    identifier: { name: node.getName() },
    shape: null,
    value: null as any,
  };

  if (!ctx.enter(instanceAsn, node)) {
    return instanceAsn;
  }

  instanceAsn.shape = node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null;
  instanceAsn.value = node.getInitializer()
    ? (tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType)
    : { id: random.createUuid(), kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: undefined };

  return ctx.leave(instanceAsn, node);
}