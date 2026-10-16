import { Directory } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseModule(node: Directory, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ModuleAsn {
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
    statements: [...tsRl.ast.declarations.parseModuleBody(indexFile, ctx)],
  };

  return ctx.leave(moduleAsn, node);
}