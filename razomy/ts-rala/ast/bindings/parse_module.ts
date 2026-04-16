import { Directory } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseModule(node: Directory): abstracts.translators.ModuleBinding {
  const indexFile = node.getSourceFile((f) => f.getBaseName().startsWith('index.'))!;
  if (!indexFile) {
    throw new Error('NO index file');
  }
  const body = tsLang.ast.bindings.parseModuleBody(indexFile);
  // Имя модуля: либо переданное (для подмодулей), либо имя папки
  const moduleName = node.getBaseName() || '';

  return {
    kind: 'ModuleBinding',
    identifier: { kind: 'Identifier', name: moduleName },
    block: {
      kind: 'BlockStatement',
      declarations: body
    },
    meta: { description: '' },
  };
}
