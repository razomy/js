import { Directory } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsRl from '@razomy/ts-rl';

export function parseDirectory(
  node: Directory,
  ctx: abstractions.patterns.HasEnterLeave,
): abstractions.translators.ModuleAsn {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) throw new Error('NO index file');

  const moduleAsn: abstractions.translators.ModuleAsn = {
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
    statements: [...tsRl.as.declarations.parseModuleBody(indexFile, ctx)],
  };

  return ctx.leave(moduleAsn, node);
}
