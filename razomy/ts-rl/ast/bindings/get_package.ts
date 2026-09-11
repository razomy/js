import { Project } from 'ts-morph';
import * as path from 'path';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function getPackage(
  project: Project,
  dirPath: string,
  onlyPublic: boolean = true,
): abstracts.translators.ModuleAst {
  const packageJsonSource = project.getSourceFile(path.join(dirPath, 'package.json'));
  if (!packageJsonSource) {
    throw new Error('No package.json found at ' + dirPath);
  }

  const packageJson = JSON.parse(packageJsonSource.getText());

  // Парсим зависимости в новый ImportAst
  const dependencies: abstracts.translators.ImportAst[] = Object.entries({
    ...(packageJson.dependencies || {}),
    ...(packageJson.peerDependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAst',
        syntaxLayer: 3,
        path: k,
        version: v as string,
        identifier: { name: k },
      } satisfies abstracts.translators.ImportAst),
  );

  // Ищем index.* файл в корневой директории пакета
  const indexFile = project.getDirectory(dirPath)?.getSourceFile((f) => f.getBaseName().startsWith('index.'));
  const statements = indexFile ? tsRl.ast.bindings.parseModuleBody(indexFile) : [];

  // Создаем корневой модуль, представляющий пакет
  const packageDeclaration: abstracts.translators.ModuleAst = {
    kind: 'ModuleAst',
    syntaxLayer: 3,
    identifier: { name: packageJson.name || 'UnknownPackage' },
    role: 'Root',
    version: packageJson.version || '0.0.0',
    block: {
      kind: 'BlockAst',
      syntaxLayer: 3,
      statements: statements
    },
    runtime: {
      kind: 'ImportAst',
      syntaxLayer: 3,
      path: '',
      version: packageJson.engines?.['node'] || '',
      identifier: { name: 'node' },
    },
    dependencies: dependencies,
  };

  // Очищаем приватную реализацию, если запрошено
  if (onlyPublic) {
    tsRl.ast.bindings.getPublicOnlyMut(packageDeclaration);
  }

  return packageDeclaration;
}
