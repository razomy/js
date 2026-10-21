import { Directory } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parseDirectory(
  node: Directory,
  ctx: abstractions.patterns.HasEnterLeave,
): abstractions.translator.ModuleAsn {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) throw new Error('NO index file');

  const moduleAsn: abstractions.translator.ModuleAsn = {
    id: random.createUuid(),
    kind: 'ModuleAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getBaseName() || '' },
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
    statements: [...tsHir.as.declarations.parseModuleBody(indexFile, ctx)],
  };

  return ctx.leave(moduleAsn, node);
}
