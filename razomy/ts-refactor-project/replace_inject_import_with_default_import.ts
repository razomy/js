import { Node, Project, SyntaxKind } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from '@razomy/string-case';
import * as path from 'path';

// Специальные саб-пакеты, которые считаются отдельными точками входа
const exceptionEntryPoints = new Set(['node', 'remote', 'browser']);

// Вспомогательная функция для построения цепочки свойств
// Теперь всё строго приводится к camelCase (a.b-c -> a.bC)
function buildPropertyAccess(base: string, paths: string[]): string {
  if (paths.length === 0) return base;
  return paths.reduce((acc, curr) => {
    return `${acc}.${stringCase.camelCase(curr)}`;
  }, base);
}

export async function replaceInjectImportWithDefaultImport(projectPath: string) {
  console.log('Инициализация проекта...');
  const tsConfigPath = projectPath.endsWith('/') ? projectPath + 'tsconfig.json' : projectPath + '/tsconfig.json';

  const project = new Project({
    tsConfigFilePath: tsConfigPath,
  });

  const sourceFiles = project.getSourceFiles();

  for (const file of sourceFiles) {
    try {
      let hasChanges = false;
      const namespacesToAdd = new Map<string, string>();

      // Собираем все имена в файле для предотвращения коллизий
      const allIdentifiersInFile = new Set(file.getDescendantsOfKind(SyntaxKind.Identifier).map((id) => id.getText()));

      const importDeclarations = file.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        const namedImports = importDecl.getNamedImports();
        const namespaceImport = importDecl.getNamespaceImport();

        // Пропускаем импорты без переменных
        if (namedImports.length === 0 && !namespaceImport) {
          continue;
        }

        let rootPackageImport = '';
        let rootPkgName = '';
        let subPathParts: string[] = [];

        // 1. АБСОЛЮТНЫЙ ИМПОРТ (@razomy/videos/node/utils)
        if (moduleSpecifier.startsWith('@razomy/')) {
          const parts = moduleSpecifier.split('/');
          if (parts.length < 2) continue;

          let rootEndIndex = 2; // По умолчанию корень: '@razomy/videos'

          // Проверяем наличие исключений (node, remote, browser)
          if (parts.length > 2 && exceptionEntryPoints.has(parts[2])) {
            rootEndIndex = 3; // Корень сдвигается: '@razomy/videos/node'
          }

          rootPackageImport = parts.slice(0, rootEndIndex).join('/');
          rootPkgName = parts.slice(1, rootEndIndex).join('_');
          subPathParts = parts.slice(rootEndIndex);
        }
        // 2. ОТНОСИТЕЛЬНЫЙ ИМПОРТ (напр. ../../node/utils)
        else if (moduleSpecifier.startsWith('.')) {
          let targetFilePath = '';
          const importedSourceFile = importDecl.getModuleSpecifierSourceFile();

          if (importedSourceFile) {
            targetFilePath = importedSourceFile.getFilePath();
          } else {
            targetFilePath = path.resolve(file.getDirectoryPath(), moduleSpecifier);
          }

          targetFilePath = targetFilePath.replace(/\\/g, '/');
          const rootFolderName = '/razomy/';
          const matchIndex = targetFilePath.lastIndexOf(rootFolderName);

          if (matchIndex === -1) continue;

          const packageRelativePath = targetFilePath.substring(matchIndex + rootFolderName.length);

          let cleanPath = packageRelativePath.replace(/\.[tj]sx?$/, '');
          if (cleanPath.endsWith('/index')) {
            cleanPath = cleanPath.slice(0, -6);
          }

          const parts = cleanPath.split('/'); // ['videos', 'node', 'utils']
          let rootEndIndex = 1; // По умолчанию: 'videos'

          // Проверяем наличие исключений (node, remote, browser)
          if (parts.length > 1 && exceptionEntryPoints.has(parts[1])) {
            rootEndIndex = 2; // Корень сдвигается: 'videos', 'node'
          }

          rootPkgName = parts.slice(0, rootEndIndex).join('_'); // 'videos' или 'videos_node'
          rootPackageImport = `@razomy/${parts.slice(0, rootEndIndex).join('/')}`;

          // Исключаем папку src, остальное идет в sub-path
          subPathParts = parts.slice(rootEndIndex).filter((p) => p !== 'src');
        } else {
          continue;
        }

        // ==========================================================
        // === ПРОВЕРКА: ЕСЛИ ИМПОРТ УЖЕ ПРАВИЛЬНЫЙ ===
        // ==========================================================
        if (namedImports.length === 0 && namespaceImport && moduleSpecifier === rootPackageImport) {
          // Если это УЖЕ корректный namespace импорт корневого пакета
          // (например, import * as videosNode from '@razomy/videos/node')
          if (!namespacesToAdd.has(rootPackageImport)) {
            namespacesToAdd.set(rootPackageImport, namespaceImport.getText());
          }
          continue; // Идем к следующему импорту, этот не удаляем и не помечаем файл как измененный
        }

        // ==========================================================
        // === ГЕНЕРАЦИЯ АЛИАСА ДЛЯ КОРНЕВОГО ПАКЕТА ===
        // ==========================================================
        let aliasName = namespacesToAdd.get(rootPackageImport);

        if (!aliasName) {
          const existingImport = file.getImportDeclaration(
            (decl) => decl.getModuleSpecifierValue() === rootPackageImport,
          );
          const existingNamespace = existingImport?.getNamespaceImport();

          if (existingNamespace) {
            aliasName = existingNamespace.getText();
          } else {
            // Генерируем имя (videos -> videos; videos_node -> videosNode)
            const aliasBase = stringCase.camelCase(rootPkgName);
            aliasName = tsRefactor.toSafeName(aliasBase);

            while (allIdentifiersInFile.has(aliasName) || Array.from(namespacesToAdd.values()).includes(aliasName)) {
              aliasName += '_';
            }
            allIdentifiersInFile.add(aliasName);
          }
          namespacesToAdd.set(rootPackageImport, aliasName);
        }

        const propertyAccessPrefix = buildPropertyAccess(aliasName, subPathParts);

        // ==========================================================
        // === ЗАМЕНА NAMED ИМПОРТОВ (import { X }) ===
        // ==========================================================
        for (const named of namedImports) {
          const importedName = named.getName();
          const aliasNode = named.getAliasNode();

          const searchNode = aliasNode || named.getNameNode();
          const references = searchNode['findReferencesAsNodes']();

          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== named.getNameNode() && ref !== aliasNode,
          );

          localRefs.sort((a, b) => b.getStart() - a.getStart());

          const replacementStr = subPathParts.length > 0
            ? `${propertyAccessPrefix}.${importedName}`
            : `${aliasName}.${importedName}`;

          for (const ref of localRefs) {
            const parent = ref.getParent();

            if (parent && Node.isShorthandPropertyAssignment(parent)) {
              parent.replaceWithText(`${searchNode.getText()}: ${replacementStr}`);
            } else {
              ref.replaceWithText(replacementStr);
            }
          }
        }

        // ==========================================================
        // === ЗАМЕНА NAMESPACE ИМПОРТОВ (import * as subPath) ===
        // ==========================================================
        if (namespaceImport) {
          const nsNameNode = namespaceImport;
          const nsName = nsNameNode.getText();
          const references = nsNameNode['findReferencesAsNodes']();

          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== nsNameNode
          );

          localRefs.sort((a, b) => b.getStart() - a.getStart());

          const replacementStr = propertyAccessPrefix;

          for (const ref of localRefs) {
            const parent = ref.getParent();
            if (parent && Node.isShorthandPropertyAssignment(parent)) {
              parent.replaceWithText(`${nsName}: ${replacementStr}`);
            } else {
              ref.replaceWithText(replacementStr);
            }
          }
        }

        importDecl.remove();
        hasChanges = true;
      }

      // Добавляем новые сгенерированные импорты
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
        console.log(`Файл обновлен: ${file.getBaseName()}`);
      }
    } catch (e) {
      console.log(`Ошибка в файле ${file.getFilePath()}:`, e);
    }
  }

  console.log('Сохранение изменений...');
  await project.save();
  console.log('Готово!');
}
