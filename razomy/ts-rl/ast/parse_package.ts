import { Project } from 'ts-morph';
import * as path from 'path';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parsePackage(project: Project, dirPath: string): abstracts.translators.ModuleAst {
  const packageJsonSource = project.getSourceFile(path.join(dirPath, 'package.json'));
  if (!packageJsonSource) {
    throw new Error('No package.json found at ' + dirPath);
  }

  const packageJson = JSON.parse(packageJsonSource.getText());

  // Парсим зависимости в новый ImportAst
  const dependencies: abstracts.translators.ImportAst[] = Object.entries({
    ...(packageJson.dependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAst',
        syntaxLayer: 'statement',
        path: k,
        version: v as string,
        modifiers: [{ kind: 'DependencyModifierAst', syntaxLayer: 'text', value: null, operator: 'dependency' }],
        identifier: { name: k },
      } satisfies abstracts.translators.ImportAst),
  );

  const peerDependencies: abstracts.translators.ImportAst[] = Object.entries({
    ...(packageJson.peerDependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAst',
        syntaxLayer: 'statement',
        path: k,
        version: v as string,
        modifiers: [{ kind: 'DependencyModifierAst', syntaxLayer: 'text', value: null, operator: 'peerDependency' }],
        identifier: { name: k },
      } satisfies abstracts.translators.ImportAst),
  );

  const runtimes: abstracts.translators.ImportAst[] = [
    {
      kind: 'ImportAst',
      syntaxLayer: 'statement',
      path: '',
      version: packageJson.engines?.['node'] || '',
      identifier: { name: 'node' },
      modifiers: [{ kind: 'DependencyModifierAst', syntaxLayer: 'text', value: null, operator: 'runtime' }],
    },
  ];

  // Ищем index.* файл в корневой директории пакета
  const indexFile = project.getDirectory(dirPath)?.getSourceFile((f) => f.getBaseName().startsWith('index.'));
  const statements = indexFile ? tsRl.ast.declarations.parseModuleBody(indexFile) : [];

  // Создаем корневой модуль, представляющий пакет
  const packageDeclaration: abstracts.translators.ModuleAst = {
    kind: 'ModuleAst',
    syntaxLayer: 'statement',
    identifier: { name: packageJson.name || 'UnknownPackage' },
    role: 'SourceFile',
    version: packageJson.version || '0.0.0',
    block: {
      kind: 'BlockAst',
      syntaxLayer: 'statement',
      statements: [...runtimes, ...dependencies, ...peerDependencies, ...statements],
    },
  };

  return packageDeclaration;
}
