import {SourceFile} from "ts-morph";

import * as abstracts from "@razomy/abstracts";
import {parseNode} from "./parse_node";
import {parseModuleDeclaration} from "./parse_module_declaration";

/**
 * Parses a single SourceFile into a Module
 */
export function parseModuleDeclarationBody(file: SourceFile) {
  const body: abstracts.translators.AstLeafType[] = [];

  for (const statement of file.getStatements()) {
    const parsedNode = parseNode(statement);
    if (parsedNode) {
      body.push(parsedNode);
    }
  }

  // Получаем все выражения экспорта из index.ts
  const exportDeclarations = file.getExportDeclarations();

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
          kind: 'ModuleBinding',
          identifier: {kind: 'Identifier', name: subModuleName},
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


  return body;
}
