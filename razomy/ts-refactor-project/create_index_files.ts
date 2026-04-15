import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import * as fsFile from '@razomy/fs-file';
import * as array from '@razomy/array';
import * as path from 'path';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from '@razomy/string-case';

// Типы платформ
type Platform = 'default' | 'node' | 'browser' | 'remote';

export async function createIndexFiles(projectPath_: string) {
  const projectPath = path.resolve(projectPath_);
  const project = new Project({ tsConfigFilePath: path.join(projectPath, 'tsconfig.json') });

  const directories = project.getDirectories();

  for (const dir of directories) {
    const dirPath = dir.getPath();

    // Фильтры игнорируемых папок
    if (shouldIgnorePath(dirPath, projectPath)) continue;

    // Списки для хранения строк экспорта
    const exports = {
      default: [] as string[], // Попадает во все файлы
      node: [] as string[], // Только для index.ts (как default/node)
      browser: [] as string[], // Только для index.browser.ts
      remote: [] as string[], // Только для index.remote.ts
    };

    // 1. Обработка подпапок (Sub-directories)
    // Обычно подпапки считаются универсальными модулями
    for (const subDir of dir.getDirectories()) {
      if (shouldIgnorePath(subDir.getPath(), projectPath)) continue;

      function generateDirExportWithPlatform() {
        // Определяем платформу файла по имени
        const platform = getDirPlatforms(subDir.getPath());

        // Распределяем по бакетам
        if (platform.includes('default')) {
          const exportLine = generateDirExport(subDir.getPath(), subDir.getBaseName(), 'default');
          exports.default.push(exportLine);
        }
        if (platform.includes('browser')) {
          const exportLine = generateDirExport(subDir.getPath(), subDir.getBaseName(), 'browser');
          exports.browser.push(exportLine);
        }
        if (platform.includes('node')) {
          const exportLine = generateDirExport(subDir.getPath(), subDir.getBaseName(), 'node');
          exports.node.push(exportLine);
        }
      }

      generateDirExportWithPlatform();
    }

    // 2. Обработка файлов (Files)
    for (const sourceFile of dir.getSourceFiles()) {
      if (shouldIgnorePath(sourceFile.getFilePath(), projectPath)) continue;

      const baseName = sourceFile.getBaseNameWithoutExtension();
      const fullName = sourceFile.getBaseName();
      // Пропускаем index файлы и тесты
      if (fullName.startsWith('index.') || fullName.match(/\.(spec|test)\./)) continue;

      // Получаем строку экспорта (export { ... } или export * as ...)
      const exportLine = generateFileExport(sourceFile, baseName);
      if (!exportLine) continue;

      // Определяем платформу файла по имени
      const platform = getFilePlatform(baseName);

      // Распределяем по бакетам
      if (platform === 'default') {
        exports.default.push(exportLine);
      } else {
        exports[platform].push(exportLine);
      }
    }

    // 3. Генерация и запись файлов
    // Если есть универсальные экспорты или специфичные для платформы, создаем файл

    const universalContent = array.sortBy([...exports.default]);
    if (universalContent.length > 0) {
      saveIndexFile(project, `${dirPath}/index.ts`, universalContent);
    }

    // A. index.ts (Node + Universal)
    const nodeContent = array.sortBy([...exports.default, ...exports.node]);
    if (nodeContent.length > 0 && exports.node.length) {
      saveIndexFile(project, `${dirPath}/index.node.ts`, nodeContent);
    } else {
      fsFile.deleteSync(`${dirPath}/index.node.ts`);
    }

    // B. index.browser.ts (Browser + Universal)
    const browserContent = array.sortBy([...exports.default, ...exports.browser]);
    if (browserContent.length > 0 && exports.browser.length) {
      saveIndexFile(project, `${dirPath}/index.browser.ts`, browserContent);
    } else {
      fsFile.deleteSync(`${dirPath}/index.browser.ts`);
    }

    // C. index.remote.ts (Remote + Universal)
    // const remoteContent = array.sortBy([...exports.default, ...exports.remote]);
    // if (remoteContent.length > 0) {
    //   saveIndexFile(project, `${dirPath}/index.remote.ts`, remoteContent);
    // }
  }

  await project.save();
}

// --- Helpers ---

/**
 * Проверка путей, которые нужно игнорировать
 */
function shouldIgnorePath(p: string, projectPath: string): boolean {
  return (
    p.includes('/node_modules/') ||
    p.includes('/tmp/') ||
    p.includes('/dist/') ||
    p.includes('/bin/') ||
    p === projectPath ||
    p === projectPath + '/razomy'
  );
}

/**
 * Определяет платформу файла на основе суффикса в имени
 * пример: user.service.browser.ts -> 'browser'
 */
function getFilePlatform(fileName: string): Platform {
  if (fileName.includes('.browser')) return 'browser';
  if (fileName.includes('.node')) return 'node';
  if (fileName.includes('.remote')) return 'remote';
  return 'default';
}

function getDirPlatforms(fullPath: string): (Platform | null)[] {
  return [
    fsFile.isExist(path.join(fullPath, 'index.ts')) ? 'default' : null,
    fsFile.isExist(path.join(fullPath, 'index.node.ts')) ? 'node' : null,
    fsFile.isExist(path.join(fullPath, 'index.browser.ts')) ? 'browser' : null,
    fsFile.isExist(path.join(fullPath, 'index.remote.ts')) ? 'remote' : null,
  ];
}

/**
 * Генерирует строку экспорта для папки (учитывая package.json если есть)
 */
function generateDirExport(fullPath: string, baseName: string, platform: Platform): string {
  const safeKey = tsRefactor.toSafeName(stringCase.camelCase(baseName));
  const childPackageJsonPath = path.join(fullPath, 'package.json');

  if (fsFile.isExist(childPackageJsonPath)) {
    const name = fsFile.tryGetJson(childPackageJsonPath).name;
    return `export * as ${safeKey} from '${name}';`;
  } else {
    const platformExport = platform === 'default' ? '' : `/index.${platform}`;
    return `export * as ${safeKey} from './${baseName}${platformExport}';`;
  }
}

/**
 * Анализирует файл ts-morph и возвращает строку экспорта
 */
function generateFileExport(sourceFile: SourceFile, baseName: string): string | null {
  const exportedDeclarations = sourceFile.getExportedDeclarations();
  if (exportedDeclarations.size === 0) return null;

  let hasTypesOrClasses = false;
  let namesToExport: string[] = [];

  for (const [name, decls] of exportedDeclarations) {
    const decl = decls[0];
    const kind = decl.getKind();

    if (
      kind === SyntaxKind.ClassDeclaration ||
      kind === SyntaxKind.FunctionDeclaration ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.EnumDeclaration
    ) {
      hasTypesOrClasses = true;
      namesToExport.push(name);
    } else if (kind === SyntaxKind.InterfaceDeclaration || kind === SyntaxKind.TypeAliasDeclaration) {
      hasTypesOrClasses = true;
      namesToExport.push('type ' + name);
    } else {
      namesToExport.push(name);
    }
  }
  namesToExport = array.sortBy(namesToExport);
  // Логика выбора стиля экспорта
  if (hasTypesOrClasses) {
    if (namesToExport.length > 0) {
      const def = `export { ${namesToExport.join(', ')} } from './${baseName}';`;
      if (def.length > 120) {
        return `export {\n  ${namesToExport.join(',\n  ')},\n} from './${baseName}';`;
      }
      return def;
    }
  } else {
    // Если только утилиты/константы -> экспортируем как пространство имен
    return `export * as ${stringCase.camelCase(baseName)} from './${baseName}';`;
  }

  return null;
}

/**
 * Сохраняет файл в проект
 */
function saveIndexFile(project: Project, filePath: string, lines: string[]) {
  const content = [
    lines.join('\n'),
    '', // пустая строка в конце
  ].join('\n');

  project.createSourceFile(filePath, content, { overwrite: true });
  console.log(`[GENERATED] ${filePath}`);
}
