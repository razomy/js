import { Directory } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseModule(node: Directory): abstracts.translators.ModuleAst {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) throw new Error('NO index file');

  return {
    kind: 'ModuleAst',
    syntaxLayer: 'statement',
    identifier: { name: node.getBaseName() || '' },
    block: {
      kind: 'BlockAst',
      syntaxLayer: 'statement',
      statements: [...tsRl.ast.declarations.parseModuleBody(indexFile)],
    },
    version: null,
    role: 'SourceFile',
  };
}
