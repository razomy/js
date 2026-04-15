import {Node, Project} from 'ts-morph';
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

      const importDeclarations = file.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        const namedImports = importDecl.getNamedImports();

        if (namedImports.length === 0) {
          continue; // Пропускаем import * as или default
        }

        let rootPkg: string;
        let subpaths: string[];

        // 1. ЕСЛИ ЭТО АБСОЛЮТНЫЙ ИМПОРТ
        if (moduleSpecifier.startsWith('@razomy/')) {
          const pathWithoutPrefix = moduleSpecifier.replace('@razomy/', '');
          const pathParts = pathWithoutPrefix.split('/');

          rootPkg = pathParts[0];       // например, "ast"
          subpaths = pathParts.slice(1); // например, ["biding"]
        }
        // 2. ЕСЛИ ЭТО ОТНОСИТЕЛЬНЫЙ ИМПОРТ
        else if (moduleSpecifier.startsWith('.')) {
          // Получаем AST-узел самого файла, который импортируется
          const importedSourceFile = importDecl.getModuleSpecifierSourceFile();
          if (!importedSourceFile) {
            continue; // Если файл не найден в проекте, пропускаем
          }

          // Приводим пути к единому стандарту (для поддержки Windows)
          const filePath = importedSourceFile.getFilePath().replace(/\\/g, '/');

          // Ищем директорию пакетов монорепы (по вашему примеру это "razomy/")
          // ВАЖНО: Если у вас папки лежат в "packages/", измените константу ниже
          const rootFolderName = '/razomy/';
          const matchIndex = filePath.lastIndexOf(rootFolderName);

          if (matchIndex === -1) {
            continue; // Файл не находится внутри /razomy/, пропускаем
          }

          // Отрезаем начало пути.
          // "/.../razomy/ast/biding/parse_enum_declaration.ts" -> "ast/biding/parse_enum_declaration.ts"
          const packageRelativePath = filePath.substring(matchIndex + rootFolderName.length);

          // Получаем только путь директории (отбрасываем имя файла parse_enum_declaration.ts)
          // Результат: "ast/biding"
          const dirPath = packageRelativePath.substring(0, packageRelativePath.lastIndexOf('/'));

          const pathParts = dirPath.split('/');
          rootPkg = pathParts[0]; // "ast"

          // Извлекаем подпапки (например, ["biding"])
          // .filter(p => p !== 'src') убирает папку src, если она есть в путях вашей монорепы
          subpaths = pathParts.slice(1).filter(p => p !== 'src');
        }
        // 3. ИГНОРИРУЕМ ОСТАЛЬНОЕ (react, lodash и т.д.)
        else {
          continue;
        }

        // --- ОБЩАЯ ЛОГИКА ЗАМЕНЫ (для абсолютных и относительных) ---
        const newModuleSpecifier = `@razomy/${rootPkg}`;
        const aliasName = tsRefactor.toSafeName(stringCase.camelCase(rootPkg)); // "ast"

        namespacesToAdd.set(newModuleSpecifier, aliasName);

        for (const named of namedImports) {
          const importedName = named.getName(); // "parseEnumDeclaration"
          const aliasNode = named.getAliasNode();

          const searchNode = aliasNode || named.getNameNode();
          const references = searchNode['findReferencesAsNodes']();

          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== named.getNameNode() && ref !== aliasNode,
          );

          // Сортировка с конца для безопасной замены текста
          localRefs.sort((a, b) => b.getStart() - a.getStart());

          // Формируем: "ast" + "biding" + "parseEnumDeclaration" = "ast.biding.parseEnumDeclaration"
          const replacementStr = [aliasName, ...subpaths, importedName].join('.');

          for (const ref of localRefs) {
            const parent = ref.getParent();

            if (parent && Node.isShorthandPropertyAssignment(parent)) {
              parent.replaceWithText(`${importedName}: ${replacementStr}`);
            } else {
              ref.replaceWithText(replacementStr);
            }
          }
        }

        // Удаляем старый относительный или абсолютный импорт { ... }
        importDecl.remove();
        hasChanges = true;
      }

      // --- ДОБАВЛЕНИЕ НОВЫХ NAMESPACE ИМПОРТОВ ---
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
