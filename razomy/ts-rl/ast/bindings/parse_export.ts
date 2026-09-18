import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseExport(exportDecl: any): abstracts.translators.AstType[] {
  const namespaceExport = exportDecl.getNamespaceExport?.();
  const targetSourceFile = exportDecl.getModuleSpecifierSourceFile?.();

  // 1. Обработка: export * as ns from './module';
  if (namespaceExport && targetSourceFile) {
    if (targetSourceFile.getBaseName().startsWith('index.')) {
      return [tsRl.ast.declarations.parseModule(targetSourceFile.getDirectory())];
    } else {
      return [{
        kind: 'ModuleAst', syntaxLayer: 3,
        identifier: { name: namespaceExport.getName() },
        block: { kind: 'BlockAst', syntaxLayer: 3, statements: tsRl.ast.declarations.parseModuleBody(targetSourceFile) },
        version: '', role: 'SourceFile', dependencies: [], runtime: { kind: 'ImportAst', syntaxLayer: 3, identifier: { name: '' }, path: '', version: '' }
      }];
    }
  }
  // 2. Обработка: export * from './module';
  else if (targetSourceFile) {
    return tsRl.ast.declarations.parseModuleBody(targetSourceFile);
  }
  // 3. Обработка: export { a, b, c }; (Именованные локальные экспорты)
  else if (exportDecl.getNamedExports && exportDecl.getNamedExports().length > 0) {
    const results: abstracts.translators.AstType[] = [];
    const processedFiles = new Set<string>();

    for (const namedExport of exportDecl.getNamedExports()) {
      const symbol = namedExport.getNameNode().getSymbol();
      const originalSymbol = symbol?.getAliasedSymbol() || symbol;
      const declarations = originalSymbol?.getDeclarations();

      if (declarations && declarations.length > 0) {
        const originSourceFile = declarations[0].getSourceFile();

        if (originSourceFile && originSourceFile !== exportDecl.getSourceFile()) {
          const filePath = originSourceFile.getFilePath();

          // Проверяем, не парсили ли мы уже этот файл (на случай если из одного файла экспортируются несколько сущностей)
          if (!processedFiles.has(filePath)) {
            processedFiles.add(filePath);

            // В качестве имени модуля берем имя самого экспорта (например, 'abbreviation').
            // (Альтернатива: originSourceFile.getBaseNameWithoutExtension() чтобы получить имя файла)
            const moduleName = namedExport.getName();

            results.push({
              kind: 'ModuleAst',
              syntaxLayer: 3,
              identifier: { name: moduleName },
              block: {
                kind: 'BlockAst',
                syntaxLayer: 3,
                statements: tsRl.ast.declarations.parseModuleBody(originSourceFile)
              },
              version: '',
              role: 'SourceFile',
              dependencies: [],
              runtime: {
                kind: 'ImportAst',
                syntaxLayer: 3,
                identifier: { name: '' },
                path: '',
                version: ''
              }
            });
          }
        }
      }
    }

    return results;
  }

  return [];
}
