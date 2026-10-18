import { ImportDeclaration, Node, Project, SourceFile, SyntaxKind } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from '@razomy/string-case';
import * as path from 'path';

// Константы и конфигурации
const exceptionEntryPoints = new Set(['node', 'remote', 'browser']);
const ignoredFiles = new Set(['index.ts', 'index.node.ts', 'index.browser.ts', 'index.remote.ts']);

interface ParsedImportInfo {
  rootPackageImport: string;
  rootPkgName: string;
  subPathParts: string[];
}

/**
 * Строит цепочку свойств, приводя пути к camelCase (a, ['b-c'] -> 'a.bC')
 */
function buildPropertyAccess(base: string, paths: string[]): string {
  return paths.reduce((acc, curr) => `${acc}.${stringCase.camelCase(curr)}`, base);
}

/**
 * Заменяет конкретное использование импортированной переменной в AST
 */
function processReference(ref: Node, searchName: string, replacementStr: string): void {
  const parent = ref.getParent();
  if (!parent) return;

  // 1. Обработка сокращенных свойств объекта: { ASSIGN } -> { ASSIGN: alias.ASSIGN }
  if (Node.isShorthandPropertyAssignment(parent)) {
    parent.replaceWithText(`${searchName}: ${replacementStr}`);
    return;
  }

  // 2. Обработка реэкспортов: export { ASSIGN } -> export const ASSIGN = alias.ASSIGN;
  if (Node.isExportSpecifier(parent)) {
    const exportDecl = parent.getFirstAncestorByKind(SyntaxKind.ExportDeclaration);
    if (exportDecl) {
      const isType = parent.isTypeOnly() || exportDecl.isTypeOnly();
      const exportName = parent.getAliasNode()?.getText() ?? searchName;

      const keyword = isType ? 'type' : 'const';
      const newStatement = `export ${keyword} ${exportName} = ${replacementStr};`;

      exportDecl.getSourceFile().insertStatements(exportDecl.getChildIndex() + 1, newStatement);
      parent.remove();

      if (exportDecl.getNamedExports().length === 0) {
        exportDecl.remove();
      }
    }
    return;
  }

  // 3. Стандартная замена
  ref.replaceWithText(replacementStr);
}

/**
 * Находит все локальные ссылки на узел и заменяет их с конца файла (чтобы не сбить индексы)
 */
function replaceLocalReferences(
  file: SourceFile,
  targetNode: Node,
  replacementStr: string,
  ignoreNodes: (Node | undefined)[] = [],
): void {
  if (!Node.isReferenceFindable(targetNode)) return;

  const ignoreSet = new Set(ignoreNodes.filter((n): n is Node => Boolean(n)));
  ignoreSet.add(targetNode);

  const localRefs = targetNode
    .findReferencesAsNodes()
    .filter((ref) => ref.getSourceFile() === file && !ignoreSet.has(ref))
    .sort((a, b) => b.getStart() - a.getStart()); // Сортировка с конца

  const searchName = targetNode.getText();
  for (const ref of localRefs) {
    processReference(ref, searchName, replacementStr);
  }
}

/**
 * Парсит абсолютный импорт пакета (например, @razomy/videos/node/utils)
 */
function parseScopedImport(moduleSpecifier: string): ParsedImportInfo | null {
  const parts = moduleSpecifier.split('/');
  if (parts.length < 2) return null;

  const hasException = parts.length > 2 && exceptionEntryPoints.has(parts[2]);
  const rootEndIndex = hasException ? 3 : 2;

  return {
    rootPackageImport: parts.slice(0, rootEndIndex).join('/'),
    rootPkgName: parts.slice(1, rootEndIndex).join('_'),
    subPathParts: parts.slice(rootEndIndex),
  };
}

/**
 * Парсит относительный импорт (например, ../../node/utils)
 */
/**
 * Парсит относительный импорт (например, ../../node/utils или ./)
 */
function parseRelativeImport(
  importDecl: ImportDeclaration,
  file: SourceFile,
  sourcePath: string,
  scopeName: string,
): ParsedImportInfo | null {
  const moduleSpecifier = importDecl.getModuleSpecifierValue();
  const importedSourceFile = importDecl.getModuleSpecifierSourceFile();

  const rawTargetFilePath = importedSourceFile
    ? importedSourceFile.getFilePath()
    : path.resolve(file.getDirectoryPath(), moduleSpecifier);

  const targetFilePath = rawTargetFilePath.replace(/\\/g, '/');
  const rootFolderToken = `/${sourcePath}/`;
  const matchIndex = targetFilePath.lastIndexOf(rootFolderToken);

  if (matchIndex === -1) return null;

  const packageRelativePath = targetFilePath.substring(matchIndex + rootFolderToken.length);

  // Проверяем, указывал ли путь на конкретный файл (имеет расширение .ts/.js)
  const isFile = /\.[tj]sx?$/.test(packageRelativePath);
  let cleanPath = packageRelativePath.replace(/\.[tj]sx?$/, '');

  // Если это был index-файл, отрезаем '/index' — теперь путь указывает ровно на директорию
  let isDirectory = !isFile;
  if (cleanPath.endsWith('/index')) {
    cleanPath = cleanPath.slice(0, -6);
    isDirectory = true;
  }

  let parts = cleanPath.split('/').filter(Boolean);

  // Если это был обычный файл (например, language/utils.ts), а не директория/index,
  // то отрезаем имя файла (поведение старого removeLastMut)
  if (!isDirectory) {
    parts = parts.slice(0, -1);
  }

  if (parts.length === 0) return null;

  const hasException = parts.length > 1 && exceptionEntryPoints.has(parts[1]);
  const rootEndIndex = hasException ? 2 : 1;

  return {
    rootPkgName: parts.slice(0, rootEndIndex).join('_'),
    rootPackageImport: `${scopeName}/${parts.slice(0, rootEndIndex).join('/')}`,
    subPathParts: parts.slice(rootEndIndex).filter((p) => p !== 'src'),
  };
}

/**
 * Определяет структуру пакета и подпутей из декларации импорта
 */
function resolveImportInfo(
  importDecl: ImportDeclaration,
  file: SourceFile,
  sourcePath: string,
  scopeName: string,
): ParsedImportInfo | null {
  const moduleSpecifier = importDecl.getModuleSpecifierValue();

  if (moduleSpecifier.startsWith(`${scopeName}/`)) {
    return parseScopedImport(moduleSpecifier);
  }
  if (moduleSpecifier.startsWith('.')) {
    return parseRelativeImport(importDecl, file, sourcePath, scopeName);
  }
  return null;
}

/**
 * Получает существующий или генерирует новый безопасный алиас для корневого пакета
 */
/**
 * Получает существующий или генерирует новый безопасный алиас для корневого пакета
 */
function getOrCreateAlias(
  file: SourceFile,
  rootPackageImport: string,
  rootPkgName: string,
  namespacesToAdd: Map<string, string>,
  usedIdentifiers: Set<string>,
  currentNamespaceText?: string, // <--- ДОБАВЛЕН ПАРАМЕТР
): string {
  const cachedAlias = namespacesToAdd.get(rootPackageImport);
  if (cachedAlias) return cachedAlias;

  const existingImport = file.getImportDeclaration((decl) => decl.getModuleSpecifierValue() === rootPackageImport);
  const existingNamespace = existingImport?.getNamespaceImport();

  let aliasName: string;

  if (existingNamespace) {
    aliasName = existingNamespace.getText();
  } else {
    const aliasBase = stringCase.camelCase(rootPkgName);
    aliasName = tsRefactor.toSafeName(aliasBase);

    // Если желаемое имя совпадает с текущим namespace (который мы сейчас удалим),
    // и при этом в файле нет ДРУГИХ переменных с таким же именем — используем его без '_'
    if (currentNamespaceText !== aliasName) {
      while (usedIdentifiers.has(aliasName)) {
        aliasName += '_';
      }
    }
    usedIdentifiers.add(aliasName);
  }

  namespacesToAdd.set(rootPackageImport, aliasName);
  return aliasName;
}

/**
 * Обрабатывает один конкретный файл
 */
function processSourceFile(file: SourceFile, sourcePath: string, scopeName: string): boolean {
  let hasChanges = false;
  const namespacesToAdd = new Map<string, string>();

  // Собираем все идентификаторы, чтобы избежать коллизий имен
  const usedIdentifiers = new Set(file.getDescendantsOfKind(SyntaxKind.Identifier).map((id) => id.getText()));

  for (const importDecl of file.getImportDeclarations()) {
    const namedImports = importDecl.getNamedImports();
    const namespaceImport = importDecl.getNamespaceImport();

    if (namedImports.length === 0 && !namespaceImport) continue;

    const importInfo = resolveImportInfo(importDecl, file, sourcePath, scopeName);
    if (!importInfo) continue;

    const { rootPackageImport, rootPkgName, subPathParts } = importInfo;
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    // Если импорт уже имеет правильный формат (import * as pkg from '@scope/pkg')
    if (namedImports.length === 0 && namespaceImport && moduleSpecifier === rootPackageImport) {
      if (!namespacesToAdd.has(rootPackageImport)) {
        const nsText = namespaceImport.getText();
        namespacesToAdd.set(rootPackageImport, nsText);
        usedIdentifiers.add(nsText);
      }
      continue;
    }

    const aliasName = getOrCreateAlias(
      file,
      rootPackageImport,
      rootPkgName,
      namespacesToAdd,
      usedIdentifiers,
      namespaceImport?.getText(), // <--- ПЕРЕДАЕМ ТЕКСТ ТЕКУЩЕГО NAMESPACE ИМПОРТА
    );
    // 1. Обработка Named Imports: import { a, b as c } from '...'
    for (const named of namedImports) {
      const importedName = named.getName();
      const aliasNode = named.getAliasNode();
      const nameNode = named.getNameNode();
      const searchNode = aliasNode ?? nameNode;

      const currentSubPathParts = [...subPathParts];
      const lastPart = currentSubPathParts.at(-1);

      // Избегаем тавтологии вида parseBlock.parseBlock
      if (lastPart && stringCase.camelCase(lastPart) === stringCase.camelCase(importedName)) {
        currentSubPathParts.pop();
      }

      const prefix = buildPropertyAccess(aliasName, currentSubPathParts);
      const replacementStr = `${prefix}.${importedName}`;

      replaceLocalReferences(file, searchNode, replacementStr, [nameNode, aliasNode]);
    }

    // 2. Обработка Namespace Imports: import * as utils from '...'
    if (namespaceImport) {
      const replacementStr = buildPropertyAccess(aliasName, subPathParts);
      replaceLocalReferences(file, namespaceImport, replacementStr);
    }

    importDecl.remove();
    hasChanges = true;
  }

  // Вставляем накопленные корневые namespace-импорты
  if (hasChanges) {
    for (const [modSpec, alias] of namespacesToAdd.entries()) {
      const existingImport = file.getImportDeclaration((decl) => decl.getModuleSpecifierValue() === modSpec);

      if (existingImport) {
        if (!existingImport.getNamespaceImport()) {
          existingImport.setNamespaceImport(alias);
        }
      } else {
        file.addImportDeclaration({
          namespaceImport: alias,
          moduleSpecifier: modSpec,
        });
      }
    }
  }

  return hasChanges;
}

/**
 * Основная точка входа
 */
export async function replaceInjectImportWithDefaultImport(
  projectPath: string,
  sourcePath: string,
  scopeName: string,
): Promise<void> {
  console.log('Инициализация проекта...');
  const tsConfigFilePath = path.join(projectPath, 'tsconfig.json');
  const project = new Project({ tsConfigFilePath });

  for (const file of project.getSourceFiles()) {
    if (ignoredFiles.has(file.getBaseName())) {
      continue;
    }

    try {
      const updated = processSourceFile(file, sourcePath, scopeName);
      if (updated) {
        console.log(`Файл обновлен: ${file.getBaseName()}`);
      }
    } catch (e) {
      console.error(`Ошибка в файле ${file.getFilePath()}:`, e);
    }
  }

  await project.save();
}
