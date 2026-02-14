import { Project, SyntaxKind, SourceFile } from 'ts-morph';
import { tryGetJson } from '@razomy/fs.file';
import * as path from 'path';
import * as file from '@razomy/fs.file';
import { toSafeName } from '../ts.refactor';

// Типы платформ
type Platform = 'universal' | 'node' | 'browser' | 'remote';

export async function createIndexFiles(projectPath: string) {
  const project = new Project({ tsConfigFilePath: projectPath + 'tsconfig.json' });

  const directories = project.getDirectories();

  for (const dir of directories) {
    const dirPath = dir.getPath();

    // Фильтры игнорируемых папок
    if (shouldIgnorePath(dirPath)) continue;

    // Списки для хранения строк экспорта
    const exports = {
      universal: [] as string[], // Попадает во все файлы
      node: [] as string[],      // Только для index.ts (как default/node)
      browser: [] as string[],   // Только для index.browser.ts
      remote: [] as string[],    // Только для index.remote.ts
    };

    // 1. Обработка подпапок (Sub-directories)
    // Обычно подпапки считаются универсальными модулями
    for (const subDir of dir.getDirectories()) {
      if (shouldIgnorePath(subDir.getPath())) continue;

      const exportLine = generateDirExport(subDir.getPath(), subDir.getBaseName());
      exports.universal.push(exportLine);
    }

    // 2. Обработка файлов (Files)
    for (const sourceFile of dir.getSourceFiles()) {
      if (shouldIgnorePath(sourceFile.getFilePath())) continue;

      const baseName = sourceFile.getBaseNameWithoutExtension();
      // Пропускаем index файлы и тесты
      if (baseName.startsWith('index') || sourceFile.getBaseName().match(/\.(spec|test)\./)) continue;

      // Получаем строку экспорта (export { ... } или export * as ...)
      const exportLine = generateFileExport(sourceFile, baseName);
      if (!exportLine) continue;

      // Определяем платформу файла по имени
      const platform = getFilePlatform(baseName);

      // Распределяем по бакетам
      if (platform === 'universal') {
        exports.universal.push(exportLine);
      } else {
        exports[platform].push(exportLine);
      }
    }

    // 3. Генерация и запись файлов
    // Если есть универсальные экспорты или специфичные для платформы, создаем файл

    const universalContent = [...exports.universal];
    if (universalContent.length > 0) {
      saveIndexFile(project, `${dirPath}/index.ts`, universalContent);
    }

    // A. index.ts (Node + Universal)
    const nodeContent = [...exports.universal, ...exports.node];
    if (nodeContent.length > 0) {
      saveIndexFile(project, `${dirPath}/index.node.ts`, nodeContent);
    }

    // B. index.browser.ts (Browser + Universal)
    const browserContent = [...exports.universal, ...exports.browser];
    if (browserContent.length > 0) {
      saveIndexFile(project, `${dirPath}/index.browser.ts`, browserContent);
    }

    // C. index.remote.ts (Remote + Universal)
    // const remoteContent = [...exports.universal, ...exports.remote];
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
function shouldIgnorePath(p: string): boolean {
  return p.includes('node_modules') || p.includes('dist') || p.includes('bin');
}

/**
 * Определяет платформу файла на основе суффикса в имени
 * пример: user.service.browser.ts -> 'browser'
 */
function getFilePlatform(fileName: string): Platform {
  if (fileName.includes('.browser')) return 'browser';
  if (fileName.includes('.node')) return 'node';
  if (fileName.includes('.remote')) return 'remote';
  return 'universal';
}

/**
 * Генерирует строку экспорта для папки (учитывая package.json если есть)
 */
function generateDirExport(fullPath: string, baseName: string): string {
  const safeKey = toSafeName(baseName);
  const childPackageJsonPath = path.join(fullPath, 'package.json');

  if (file.isExist(childPackageJsonPath)) {
    const name = tryGetJson(childPackageJsonPath).name;
    return `export * as ${safeKey} from '${name}';`;
  } else {
    return `export * as ${safeKey} from './${baseName}';`;
  }
}

/**
 * Анализирует файл ts-morph и возвращает строку экспорта
 */
function generateFileExport(sourceFile: SourceFile, baseName: string): string | null {
  const exportedDeclarations = sourceFile.getExportedDeclarations();
  if (exportedDeclarations.size === 0) return null;

  let hasTypesOrClasses = false;
  const namesToExport: string[] = [];

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
    } else if (
      kind === SyntaxKind.InterfaceDeclaration ||
      kind === SyntaxKind.TypeAliasDeclaration
    ) {
      hasTypesOrClasses = true;
      namesToExport.push('type ' + name);
    } else {
      namesToExport.push(name);
    }
  }

  // Логика выбора стиля экспорта
  if (hasTypesOrClasses) {
    if (namesToExport.length > 0) {
      return `export {${namesToExport.join(', ')}} from './${baseName}';`;
    }
  } else {
    // Если только утилиты/константы -> экспортируем как пространство имен
    return `export * as ${baseName} from './${baseName}';`;
  }

  return null;
}

/**
 * Сохраняет файл в проект
 */
function saveIndexFile(project: Project, filePath: string, lines: string[]) {
  const content = [
    lines.join('\n'),
    '' // пустая строка в конце
  ].join('\n');

  project.createSourceFile(filePath, content, { overwrite: true });
  console.log(`[GENERATED] ${filePath}`);
}