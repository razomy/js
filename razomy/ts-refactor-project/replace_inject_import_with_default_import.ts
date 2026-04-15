import { Node, Project, SyntaxKind } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from "@razomy/string-case";

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

      // === НОВЫЙ БЛОК: СОБИРАЕМ ВСЕ ИМЕНА В ФАЙЛЕ ===
      // Собираем абсолютно все слова, которые используются как переменные, функции, свойства на любом уровне.
      // Это дает 100% гарантию, что наш сгенерированный alias ни с чем не пересечется.
      const allIdentifiersInFile = new Set(
        file.getDescendantsOfKind(SyntaxKind.Identifier).map(id => id.getText())
      );
      // ===============================================

      const importDeclarations = file.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        const namedImports = importDecl.getNamedImports();

        if (namedImports.length === 0) {
          continue;
        }

        let rootPkg: string;
        let subpaths: string[];

        // 1. ЕСЛИ ЭТО АБСОЛЮТНЫЙ ИМПОРТ
        if (moduleSpecifier.startsWith('@razomy/')) {
          const pathWithoutPrefix = moduleSpecifier.replace('@razomy/', '');
          const pathParts = pathWithoutPrefix.split('/');

          rootPkg = pathParts[0];
          subpaths = pathParts.slice(1).map(i=>tsRefactor.toSafeName(stringCase.camelCase(i)));
        }
        // 2. ЕСЛИ ЭТО ОТНОСИТЕЛЬНЫЙ ИМПОРТ
        else if (moduleSpecifier.startsWith('.')) {
          const importedSourceFile = importDecl.getModuleSpecifierSourceFile();
          if (!importedSourceFile) continue;

          const filePath = importedSourceFile.getFilePath().replace(/\\/g, '/');
          const rootFolderName = '/razomy/';
          const matchIndex = filePath.lastIndexOf(rootFolderName);

          if (matchIndex === -1) continue;

          const packageRelativePath = filePath.substring(matchIndex + rootFolderName.length);
          const dirPath = packageRelativePath.substring(0, packageRelativePath.lastIndexOf('/'));

          const pathParts = dirPath.split('/');
          rootPkg = pathParts[0];
          subpaths = pathParts.slice(1).filter(p => p !== 'src');
        }
        else {
          continue;
        }

        // --- ФОРМИРУЕМ ALIAS С УЧЕТОМ ЛЮБЫХ КОЛЛИЗИЙ ---
        const newModuleSpecifier = `@razomy/${rootPkg}`;
        let aliasName = namespacesToAdd.get(newModuleSpecifier);

        if (!aliasName) {
          const existingImport = file.getImportDeclaration(decl => decl.getModuleSpecifierValue() === newModuleSpecifier);
          const existingNamespace = existingImport?.getNamespaceImport();

          if (existingNamespace) {
            aliasName = existingNamespace.getText();
          } else {
            aliasName = tsRefactor.toSafeName(stringCase.camelCase(rootPkg));

            // ПРОВЕРКА НА КОЛЛИЗИИ ТЕПЕРЬ АБСОЛЮТНАЯ:
            // Проверяем наличие слова в нашем Set всех идентификаторов файла.
            while (
              allIdentifiersInFile.has(aliasName) ||
              Array.from(namespacesToAdd.values()).includes(aliasName)
              ) {
              aliasName += '_';
            }

            // Как только мы придумали безопасное имя, добавляем его в Set,
            // чтобы следующие импорты из других пакетов тоже его случайно не заняли.
            allIdentifiersInFile.add(aliasName);
          }
          namespacesToAdd.set(newModuleSpecifier, aliasName);
        }

        // --- ЗАМЕНА ССЫЛОК В КОДЕ ---
        for (const named of namedImports) {
          const importedName = named.getName();
          const aliasNode = named.getAliasNode();

          const searchNode = aliasNode || named.getNameNode();
          const references = searchNode['findReferencesAsNodes']();

          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== named.getNameNode() && ref !== aliasNode,
          );

          localRefs.sort((a, b) => b.getStart() - a.getStart());

          const replacementStr = [aliasName, ...subpaths, importedName]
            .join('.');

          for (const ref of localRefs) {
            const parent = ref.getParent();

            if (parent && Node.isShorthandPropertyAssignment(parent)) {
              parent.replaceWithText(`${importedName}: ${replacementStr}`);
            } else {
              ref.replaceWithText(replacementStr);
            }
          }
        }

        importDecl.remove();
        hasChanges = true;
      }

      if (hasChanges) {
        console.log(`Обновление файла: ${file.getBaseName()}`);

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
          console.log(`    -> Добавлен импорт: import * as ${alias} from '${modSpec}'`);
        }
      }
    } catch (e) {
      console.log(e, file.getFilePath());
    }
  }

  console.log('Сохранение изменений...');
  await project.save();
  console.log('Готово!');
}
