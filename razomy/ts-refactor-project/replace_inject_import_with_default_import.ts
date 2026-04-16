import { Node, Project, SyntaxKind } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';
import * as stringCase from '@razomy/string-case';
import * as path from 'path';

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

        // Пропускаем импорты без переменных (например, `import "reflect-metadata"`)
        if (namedImports.length === 0 && !namespaceImport) {
          continue;
        }

        let targetModuleSpecifier = moduleSpecifier;

        // 1. АБСОЛЮТНЫЙ ИМПОРТ (@razomy/videos/node) - путь уже правильный
        if (moduleSpecifier.startsWith('@razomy/')) {
          targetModuleSpecifier = moduleSpecifier;
        }
        // 2. ОТНОСИТЕЛЬНЫЙ ИМПОРТ (напр. ../../node) - вычисляем абсолютный
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

          // Получаем путь внутри монорепы
          const packageRelativePath = targetFilePath.substring(matchIndex + rootFolderName.length);

          // Очищаем расширения (.ts, .tsx, /index.ts)
          let cleanPath = packageRelativePath.replace(/\.[tj]sx?$/, '');
          if (cleanPath.endsWith('/index')) {
            cleanPath = cleanPath.slice(0, -6);
          }

          const parts = cleanPath.split('/');
          const rootPkg = parts[0];
          // Исключаем папку src
          const subDirParts = parts.slice(1).filter((p) => p !== 'src');

          if (subDirParts.length > 0) {
            targetModuleSpecifier = `@razomy/${rootPkg}/${subDirParts.join('/')}`;
          } else {
            targetModuleSpecifier = `@razomy/${rootPkg}`;
          }
        } else {
          // Пропускаем сторонние библиотеки (react, lodash и т.д.)
          continue;
        }

        // ==========================================================
        // === ПРОВЕРКА: ЕСЛИ ИМПОРТ УЖЕ ПРАВИЛЬНЫЙ ===
        // ==========================================================
        if (namedImports.length === 0 && namespaceImport) {
          if (moduleSpecifier !== targetModuleSpecifier) {
            // Если путь был относительным, просто заменяем на абсолютный
            importDecl.setModuleSpecifier(targetModuleSpecifier);
            hasChanges = true;
          }
          continue; // Идем к следующему импорту, код не трогаем!
        }

        // ==========================================================
        // === ЗАМЕНА NAMED ИМПОРТОВ (import { X }) ===
        // ==========================================================
        let aliasName = namespacesToAdd.get(targetModuleSpecifier);

        if (!aliasName) {
          const existingImport = file.getImportDeclaration(
            (decl) => decl.getModuleSpecifierValue() === targetModuleSpecifier,
          );
          const existingNamespace = existingImport?.getNamespaceImport();

          if (existingNamespace) {
            aliasName = existingNamespace.getText();
          } else if (namespaceImport) {
            aliasName = namespaceImport.getText();
          } else {
            // Генерируем имя из пути: videos/node -> videosNode
            const pathWithoutPrefix = targetModuleSpecifier.replace('@razomy/', '');
            const aliasBase = stringCase.camelCase(pathWithoutPrefix.replace(/\//g, '_'));
            aliasName = tsRefactor.toSafeName(aliasBase);

            while (allIdentifiersInFile.has(aliasName) || Array.from(namespacesToAdd.values()).includes(aliasName)) {
              aliasName += '_';
            }
            allIdentifiersInFile.add(aliasName);
          }
          namespacesToAdd.set(targetModuleSpecifier, aliasName);
        }

        // Заменяем все использования импортированных переменных
        for (const named of namedImports) {
          const importedName = named.getName();
          const aliasNode = named.getAliasNode();

          const searchNode = aliasNode || named.getNameNode();
          const references = searchNode['findReferencesAsNodes']();

          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== named.getNameNode() && ref !== aliasNode,
          );

          localRefs.sort((a, b) => b.getStart() - a.getStart());

          const replacementStr = `${aliasName}.${importedName}`;

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
      console.log(e, file.getFilePath());
    }
  }

  console.log('Сохранение изменений...');
  await project.save();
  console.log('Готово!');
}
