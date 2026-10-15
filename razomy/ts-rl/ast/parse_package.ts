import type { Project } from 'ts-morph';
import * as path from 'path';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parsePackage(
  project: Project,
  dirPath: string,
  ctx: tsRl.ast.HasEnterLeaveProduce,
): abstractions.translators.ModuleAsn | null {
  const packageJsonSource = project.getSourceFile(path.join(dirPath, 'package.json'));
  if (!packageJsonSource) {
    return null;
  }

  const packageJson = JSON.parse(packageJsonSource.getText());
  const indexFile = project.getDirectory(dirPath)?.getSourceFile((f) => f.getBaseName().startsWith('index.'));
  const origin = indexFile || packageJsonSource;

  // 1. Создаем AST-каркас модуля
  const moduleAsn: abstractions.translators.ModuleAsn = {
    kind: 'ModuleAsn',
    syntaxRole: 'statement',
    identifier: { name: packageJson.name || 'UnknownPackage' },
    role: 'SourceFile',
    version: packageJson.version || '0.0.0',
    block: null as any, // Заполняется после подтверждения вхождения через ctx.enter
  };

  // 2. Входим в контекст обхода
  const isAccepted = ctx.enter(moduleAsn, origin);
  if (!isAccepted) {
    return null;
  }

  // 3. Парсим зависимости (dependencies, peerDependencies, runtimes)
  const dependencies: abstractions.translators.ImportAsn[] = Object.entries({
    ...(packageJson.dependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAsn',
        syntaxRole: 'statement',
        path: k,
        version: v as string,
        modifiers: [{ kind: 'DependencyModifierAsn', syntaxRole: 'modifier', value: null, operator: 'dependency' }],
        identifier: { name: k },
      } satisfies abstractions.translators.ImportAsn),
  );

  const peerDependencies: abstractions.translators.ImportAsn[] = Object.entries({
    ...(packageJson.peerDependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAsn',
        syntaxRole: 'statement',
        path: k,
        version: v as string,
        modifiers: [{ kind: 'DependencyModifierAsn', syntaxRole: 'modifier', value: null, operator: 'peerDependency' }],
        identifier: { name: k },
      } satisfies abstractions.translators.ImportAsn),
  );

  const runtimes: abstractions.translators.ImportAsn[] = Object.entries({
    ...(packageJson.engines || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'ImportAsn',
        syntaxRole: 'statement',
        path: k,
        version: v as string,
        modifiers: [{ kind: 'DependencyModifierAsn', syntaxRole: 'modifier', value: null, operator: 'runtime' }],
        identifier: { name: k },
      } satisfies abstractions.translators.ImportAsn),
  );

  // 4. Парсим тело модуля из index-файла (если найден)
  const statements = indexFile ? tsRl.ast.declarations.parseModuleBody(indexFile,ctx) : [];

  // 5. Формируем тело модуля
  moduleAsn.block = {
    kind: 'BlockAsn',
    syntaxRole: 'statement',
    statements: [...runtimes, ...dependencies, ...peerDependencies, ...statements],
  };

  // 6. Завершаем обход узла
  return ctx.leave(moduleAsn, origin);
}
