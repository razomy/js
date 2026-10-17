import { Node, VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseVariable(
  node: TsVariableDeclaration,
  ctx: abstractions.patterns.HasEnterLeave,
): abstractions.translators.InstanceAsn {
  const parent = node.getParent();
  const isConst = Node.isVariableDeclarationList(parent)
    ? parent.getDeclarationKind() === 'const'
    : node.getVariableStatement()?.getDeclarationKind() === 'const';

  const instanceAsn: abstractions.translators.InstanceAsn = {
    id: random.createUuid(),
    kind: 'InstanceAsn',
    syntaxRole: 'statement',
    modifiers: [
      node.isExported() ? { id: random.createUuid(), kind: 'AccessModifierAsn', syntaxRole: 'modifier', operator: 'public', value: null } : null,
      isConst ? { id: random.createUuid(), kind: 'InstanceModifierAsn', syntaxRole: 'modifier', operator: 'const', value: null } : null,
    ].filter(Boolean),

    identifier: { name: node.getName() },
    shape: null,
    value: null as any,
  };

  if (!ctx.enter(instanceAsn, node)) {
    return instanceAsn;
  }

  instanceAsn.shape = node.getTypeNode() ? tsRl.as.shapes.parse(node.getTypeNode()!, ctx) : null;
  instanceAsn.value = node.getInitializer()
    ? (tsRl.as.expressions.parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType)
    : { id: random.createUuid(), kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: undefined };

  return ctx.leave(instanceAsn, node);
}
