import { Directory } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseModule(node: Directory, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ModuleAsn {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) throw new Error('NO index file');

  return {
    kind: 'ModuleAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getBaseName() || '' },
    block: {
      kind: 'BlockAsn',
      syntaxRole: 'statement',
      statements: [...tsRl.ast.declarations.parseModuleBody(indexFile, ctx)],
    },
    version: null,
    role: 'SourceFile',
  };
}
