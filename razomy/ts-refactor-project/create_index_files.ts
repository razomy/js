import {Project, SourceFile, SyntaxKind} from 'ts-morph';
import * as fsFile from '@razomy/fs-file';
import * as path from 'path';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from '@razomy/string-case';

// Типы платформ
type Platform = 'default' | 'node' | 'browser' | 'remote';

// Структура для хранения информации об экспортах
interface ExportMeta {
  isNamespace: boolean;
  safeName: string;
  importPath: string;
  values: string[];
  types: string[];
}

export async function createIndexFiles(projectPath_: string) {
  const projectPath = path.resolve(projectPath_);
  const project = new Project({tsConfigFilePath: path.join(projectPath, 'tsconfig.json')});

  const directories = project.getDirectories();

  for (const dir of directories) {
    const dirPath = dir.getPath();
    const dirBaseName = dir.getBaseName();

    if (shouldIgnorePath(dirPath, projectPath)) continue;

    // Бакетирование по платформам (теперь храним объекты, а не строки)
    const exportsMeta = {
      default: [] as ExportMeta[],
      node: [] as ExportMeta[],
      browser: [] as ExportMeta[],
      remote: [] as ExportMeta[],
    };

    // 1. Обработка подпапок
    for (const subDir of dir.getDirectories()) {
      if (shouldIgnorePath(subDir.getPath(), projectPath)) continue;

      const platforms = getDirPlatforms(subDir.getPath());
      const subBaseName = subDir.getBaseName();

      platforms.forEach((platform) => {
        if (!platform) return;
        const meta = generateDirExportMeta(subDir.getPath(), subBaseName, platform);
        exportsMeta[platform].push(meta);
      });
    }

    // 2. Обработка файлов
    for (const sourceFile of dir.getSourceFiles()) {
      if (shouldIgnorePath(sourceFile.getFilePath(), projectPath)) continue;

      const baseName = sourceFile.getBaseNameWithoutExtension();
      const fullName = sourceFile.getBaseName();

      if (fullName.startsWith('index.') || fullName.match(/\.(spec|test)\./)) continue;

      const meta = generateFileExportMeta(sourceFile, baseName);
      if (!meta) continue;

      const platform = getFilePlatform(baseName);
      exportsMeta[platform].push(meta);
    }

    // 3. Генерация и запись файлов
    if (exportsMeta.default.length > 0) {
      const content = buildIndexContent(dirBaseName, exportsMeta.default);
      saveIndexFile(project, `${dirPath}/index.ts`, content);
    }

    // A. index.node.ts
    const nodeMeta = [...exportsMeta.default, ...exportsMeta.node];
    if (nodeMeta.length > 0 && exportsMeta.node.length > 0) {
      const content = buildIndexContent(dirBaseName, nodeMeta);
      saveIndexFile(project, `${dirPath}/index.node.ts`, content);
    } else {
      fsFile.deleteSync(`${dirPath}/index.node.ts`);
    }

    // B. index.browser.ts
    const browserMeta = [...exportsMeta.default, ...exportsMeta.browser];
    if (browserMeta.length > 0 && exportsMeta.browser.length > 0) {
      const content = buildIndexContent(dirBaseName, browserMeta);
      saveIndexFile(project, `${dirPath}/index.browser.ts`, content);
    } else {
      fsFile.deleteSync(`${dirPath}/index.browser.ts`);
    }
  }

  await project.save();
}

// --- Helpers ---

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
 * Генерирует мета-информацию для подпапок
 */
function generateDirExportMeta(fullPath: string, baseName: string, platform: Platform): ExportMeta {
  const safeName = tsRefactor.toSafeName(stringCase.camelCase(baseName));
  const childPackageJsonPath = path.join(fullPath, 'package.json');
  let importPath = '';

  if (fsFile.isExist(childPackageJsonPath)) {
    importPath = fsFile.tryGetJson(childPackageJsonPath).name;
  } else {
    const platformExport = platform === 'default' ? '' : `/index.${platform}`;
    importPath = `./${baseName}${platformExport}`;
  }

  return {
    isNamespace: true,
    safeName,
    importPath,
    values: [],
    types: [],
  };
}

/**
 * Генерирует мета-информацию для файлов, разделяя значения и типы
 */
function generateFileExportMeta(sourceFile: SourceFile, baseName: string): ExportMeta | null {
  const exportedDeclarations = sourceFile.getExportedDeclarations();
  if (exportedDeclarations.size === 0) return null;

  let hasTypesOrClasses = false;
  const values: string[] = [];
  const types: string[] = [];

  for (const [name, decls] of exportedDeclarations) {
    const kind = decls[0].getKind();

    if (
      kind === SyntaxKind.InterfaceDeclaration ||
      kind === SyntaxKind.TypeAliasDeclaration
    ) {
      hasTypesOrClasses = true;
      types.push(name);
    } else if (
      kind === SyntaxKind.ClassDeclaration ||
      kind === SyntaxKind.FunctionDeclaration ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.EnumDeclaration
    ) {
      hasTypesOrClasses = true;
      values.push(name);
    } else {
      values.push(name);
    }
  }

  // Если в файле только утилиты, импортируем его как namespace (по вашей старой логике)
  if (!hasTypesOrClasses) {
    return {
      isNamespace: true,
      safeName: tsRefactor.toSafeName(stringCase.camelCase(baseName)),
      importPath: `./${baseName}`,
      values: [],
      types: [],
    };
  }

  return {
    isNamespace: false,
    safeName: '', // Не используется
    importPath: `./${baseName}`,
    values,
    types,
  };
}

/**
 * Собирает всё в единый контент файла index.ts (с Named экспортами и Default объектом)
 */
function buildIndexContent(dirBaseName: string, itemsMeta: ExportMeta[]): string[] {
  const lines: string[] = [];
  const imports: string[] = [];
  const namedExports: string[] = [];
  const namedTypeExports: string[] = [];
  const objProps: string[] = [];
  const nsProps: string[] = [];

  // Сортируем для красоты и стабильности
  const items = itemsMeta.sort((a, b) => a.importPath.localeCompare(b.importPath));

  for (const item of items) {
    if (item.isNamespace) {
      imports.push(`import * as ${item.safeName} from '${item.importPath}';`);
      namedExports.push(item.safeName);
      objProps.push(`  ${item.safeName},`);
    } else {
      if (item.values.length > 0) {
        const vals = item.values.sort().join(', ');
        imports.push(`import { ${vals} } from '${item.importPath}';`);
        namedExports.push(...item.values);
        item.values.forEach((v) => objProps.push(`  ${v},`));
      }
      if (item.types.length > 0) {
        const typs = item.types.sort().join(', ');
        imports.push(`import type { ${typs} } from '${item.importPath}';`);
        namedTypeExports.push(...item.types);
        item.types.forEach((t) => nsProps.push(`  export type ${t} = ${t};`));
      }
    }
  }

  // 1. Импорты
  if (imports.length > 0) {
    lines.push('// Imports');
    lines.push(...imports);
    lines.push('');
  }

  // 2. Именованные экспорты (Заменяют старые export { ... } from '...')
  lines.push('// Named exports');
  if (namedExports.length > 0) {
    lines.push(`export {\n  ${namedExports.sort().join(',\n  ')}\n};`);
  }
  if (namedTypeExports.length > 0) {
    lines.push(`export type {\n  ${namedTypeExports.sort().join(',\n  ')}\n};`);
  }
  lines.push('');

  // 3. Создаем Default Export (Объект + Namespace)
  const safeDirName = tsRefactor.toSafeName(stringCase.camelCase(dirBaseName)) || 'Module';

  if (objProps.length > 0) {
    lines.push('// Default export');
    lines.push(`const ${safeDirName} = {`);
    lines.push(objProps.join('\n'));
    lines.push(`};`);

    if (nsProps.length > 0) {
      lines.push('');
      // lines.push(`namespace ${safeDirName} {`);
      // lines.push(nsProps.join('\n'));
      // lines.push(`}`);
    }

    lines.push('');
    lines.push(`export default ${safeDirName};`);
  }

  return lines;
}

/**
 * Сохраняет файл в проект
 */
function saveIndexFile(project: Project, filePath: string, lines: string[]) {
  const content = lines.join('\n') + '\n';
  project.createSourceFile(filePath, content, {overwrite: true});
  console.log(`[GENERATED] ${filePath}`);
}
