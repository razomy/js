import {Directory} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseModuleDeclarationBody} from "./parse_module_declaration_body";

export function parseModuleDeclaration(
  node: Directory,
): abstracts.translators.ModuleDeclaration {
  const body: abstracts.translators.DeclarationType[] = [];

  // Имя модуля: либо переданное (для подмодулей), либо имя папки
  const moduleName = node.getBaseName()|| '';

  // Ищем index файл в папке (index.ts, index.d.ts и т.д.)
  const indexFile = node.getSourceFile(f => f.getBaseName().startsWith("index."));

  if (indexFile) {
    // Получаем все выражения экспорта из index.ts
    const exportDeclarations = indexFile.getExportDeclarations();

    for (const exportDecl of exportDeclarations) {
      // Пытаемся получить `as ast` (NamespaceExport)
      const namespaceExport = exportDecl.getNamespaceExport();

      // Получаем файл, на который ссылается экспорт (from './ast' или from './get_package_specifications')
      const targetSourceFile = exportDecl.getModuleSpecifierSourceFile();

      if (!targetSourceFile) continue;

      if (namespaceExport) {
        // 1. КЕЙС: export * as ast from './ast'; (ПОДМОДУЛЬ)
        const subModuleName = namespaceExport.getName();

        // Проверяем, указывает ли экспорт на index-файл в другой папке
        const isTargetIndex = targetSourceFile.getBaseName().startsWith("index.");

        if (isTargetIndex) {
          // Если это папка с index.ts внутри, рекурсивно парсим саму папку
          const subDir = targetSourceFile.getDirectory();
          const subModule = parseModuleDeclaration(subDir);
          body.push(subModule);
        } else {
          // Если это экспорт конкретного файла как подмодуля (export * as types from './types.ts')
          // Оборачиваем его содержимое в ModuleDeclaration
          const items = parseModuleDeclarationBody(targetSourceFile);
          body.push({
            kind: 'ModuleDeclaration',
            isPublic: true,
            identifier: { kind: 'Identifier', name: subModuleName },
            body: items,
            description: '',
          });
        }
      } else {
        // 2. КЕЙС: export { getPackageSpecifications } from './...'; (ФАЙЛЫ В BODY)
        // Парсим исходный файл
        const items = parseModuleDeclarationBody(targetSourceFile);

        // Распаковываем все найденные декларации напрямую в текущий body
        body.push(...items);
      }
    }
  } else {
    for (const sourceFile of node.getSourceFiles()) {
      const items = parseModuleDeclarationBody(sourceFile);
      body.push(...items);
    }
  }

  return {
    kind: 'ModuleDeclaration',
    isPublic: true,
    identifier: { kind: 'Identifier', name: moduleName },
    body: body,
    description: '',
  };
}
