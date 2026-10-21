import { ModuleDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parseModule(
  node: ModuleDeclaration,
  ctx: abstractions.patterns.HasEnterLeave,
): abstractions.translator.ModuleAsn {
  const moduleAsn: abstractions.translator.ModuleAsn = {
    id: random.createUuid(),
    kind: 'ModuleAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() || '' },
    block: null as any,
    version: null,
    role: 'SourceFile',
  };

  if (!ctx.enter(moduleAsn, node)) {
    return moduleAsn;
  }

  moduleAsn.block = {
    id: random.createUuid(),
    kind: 'BlockAsn',
    syntaxRole: 'statement',
    statements: [...tsHir.as.declarations.parseModuleBody(node, ctx)],
  };

  return ctx.leave(moduleAsn, node);
}
