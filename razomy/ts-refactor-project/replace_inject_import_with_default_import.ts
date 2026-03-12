import { Node, Project } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';

export async function replaceInjectImportWithDefaultImport(projectPath: string) {
  console.log('Инициализация проекта...');
  // Убедитесь, что путь к tsconfig прописан корректно
  const tsConfigPath = projectPath.endsWith('/') ? projectPath + 'tsconfig.json' : projectPath + '/tsconfig.json';

  const project = new Project({
    tsConfigFilePath: tsConfigPath,
  });

  const sourceFiles = project.getSourceFiles();

  for (const file of sourceFiles) {
    try {
      let hasChanges = false;
      // Храним пространства имен, которые нужно добавить: Map<moduleSpecifier, aliasName>
      const namespacesToAdd = new Map<string, string>();

      const importDeclarations = file.getImportDeclarations();

      for (const importDecl of importDeclarations) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();

        // Игнорируем все, кроме '@razomy/'
        if (!moduleSpecifier.startsWith('@razomy/')) {
          continue;
        }

        const namedImports = importDecl.getNamedImports();
        if (namedImports.length === 0) {
          continue; // Пропускаем, если импорт уже namespace (import * as) или default
        }

        // Парсим путь. Например: "@razomy/array-recursive/dict"
        const pathWithoutPrefix = moduleSpecifier.replace('@razomy/', '');
        const pathParts = pathWithoutPrefix.split('/');

        // Извлекаем корневой пакет и подпути
        const rootPkg = pathParts[0]; // "array-recursive"
        const subpaths = pathParts.slice(1); // ["dict"]

        // Формируем новый импорт.
        // Прим: в вашем примере 'array-recusive' почему-то маппится в 'array',
        // но для безопасности скрипт берет реальное имя пакета ('array-recusive' -> '@razomy/array-recusive')
        const newModuleSpecifier = `@razomy/${rootPkg}`;
        const aliasName = tsRefactor.toSafeName(rootPkg); // "arrayRecursive"

        namespacesToAdd.set(newModuleSpecifier, aliasName);

        // Проходим по каждому импортированному имени (например, flat)
        for (const named of namedImports) {
          const importedName = named.getName();
          // Учитываем ситуацию `import { flat as myFlat }`
          const aliasNode = named.getAliasNode();

          // Получаем узел, по которому будем искать ссылки
          const searchNode = aliasNode || named.getNameNode();
          const references = searchNode['findReferencesAsNodes']();

          // Фильтруем ссылки: только в текущем файле и исключаем сам блок import {...}
          const localRefs = references.filter(
            (ref) => ref.getSourceFile() === file && ref !== named.getNameNode() && ref !== aliasNode,
          );

          // ВАЖНО: Сортируем с конца файла в начало, чтобы при замене текста
          // не сдвигались позиции (offsets) для следующих замен
          localRefs.sort((a, b) => b.getStart() - a.getStart());

          // Формируем путь для замены. Пример: arrayRecursive.dict.flat
          const replacementStr = [aliasName, ...subpaths, importedName].join('.');

          for (const ref of localRefs) {
            const parent = ref.getParent();

            // Обработка edge-кейса: если функция использована как shorthand-свойство объекта:
            // const obj = { flat } -> const obj = { flat: array.dict.flat }
            if (parent && Node.isShorthandPropertyAssignment(parent)) {
              parent.replaceWithText(`${importedName}: ${replacementStr}`);
            } else {
              // Обычная замена вызова функции
              ref.replaceWithText(replacementStr);
            }
          }
        }

        // Удаляем старый import { ... } from '@razomy/...'
        importDecl.remove();
        hasChanges = true;
      }

      if (hasChanges) {
        console.log(`Обновление файла: ${file.getBaseName()}`);

        // Добавляем сгруппированные namespace-импорты в файл
        for (const [modSpec, alias] of namespacesToAdd.entries()) {
          // Проверяем, не был ли он добавлен ранее или существует в файле
          const existingImport = file.getImportDeclaration((decl) => decl.getModuleSpecifierValue() === modSpec);

          if (existingImport) {
            // Если импорт есть, но у него нет namespace, добавляем
            if (!existingImport.getNamespaceImport()) {
              existingImport.setNamespaceImport(alias);
            }
          } else {
            // Создаем с нуля `import * as alias from 'modSpec'`
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

replaceInjectImportWithDefaultImport('../../');
