import * as tsTranslators from "@razomy/ts-translators";
import * as abstracts from "@razomy/abstracts";
import {parseModuleBody} from "./parse_module_body";

export function parseExport(exportDecl) {
  // Пытаемся получить `as ast` (NamespaceExport)
  const namespaceExport = exportDecl.getNamespaceExport();

  // Получаем файл, на который ссылается экспорт (from './ast' или from './get_package_specifications')
  const targetSourceFile = exportDecl.getModuleSpecifierSourceFile();

  if (namespaceExport && targetSourceFile) {
    // 1. КЕЙС: export * as ast from './ast'; (ПОДМОДУЛЬ)
    const subModuleName = namespaceExport.getName();

    // Проверяем, указывает ли экспорт на index-файл в другой папке
    const isTargetIndex = targetSourceFile.getBaseName().startsWith('index.');

    if (isTargetIndex) {
      // Если это папка с index.ts внутри, рекурсивно парсим саму папку
      const subDir = targetSourceFile.getDirectory();
      const subModule = tsTranslators.ast.bindings.parseModule(subDir);
      return ([subModule]);
    } else {
      // Если это экспорт конкретного файла как подмодуля (export * as types from './types.ts')
      // Оборачиваем его содержимое в ModuleDeclaration
      const items = parseModuleBody(targetSourceFile);
      return [({
        kind: 'ModuleBinding',
        identifier: {kind: 'Identifier', name: subModuleName},
        block: {
          kind: 'BlockStatement',
          declarations: items
        },
        meta: {description: ''},
      }) as abstracts.translators.ModuleBinding];
    }
  } else {
    // 2. КЕЙС: export { getPackageSpecifications } from './...'; (ФАЙЛЫ В BODY)
    // Парсим исходный файл
    const items = parseModuleBody(targetSourceFile);

    // Распаковываем все найденные декларации напрямую в текущий body
    return items;
  }
}
