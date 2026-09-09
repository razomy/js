import { Directory } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseModuleBody } from "./parse_module_body";

export function parseModule(node: Directory): translators.ModuleAst {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) throw new Error('NO index file');
  
  return {
    kind: 'ModuleAst', syntaxLayer: 3,
    identifier: { name: node.getBaseName() || '' },
    block: { kind: 'BlockAst', syntaxLayer: 3, statements: parseModuleBody(indexFile) },
    version: null,
    role: 'SourceFile',
    dependencies: [],
    runtime: { kind: 'ImportAst', syntaxLayer: 3, identifier: { name: 'node' }, path: '', version: '' }
  };
}
