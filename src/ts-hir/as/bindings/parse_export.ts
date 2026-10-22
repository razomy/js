import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parseExport(
  exportDecl: any,
  ctx: abstractions.patterns.HasEnterLeave,
): abstractions.translator.AsnType[] {
  const namespaceExport = exportDecl.getNamespaceExport?.();
  const targetSourceFile = exportDecl.getModuleSpecifierSourceFile?.();

  // 1. Обработка: export * as ns from './module';
  if (namespaceExport && targetSourceFile) {
    if (targetSourceFile.getBaseName().startsWith('index.')) {
      return [tsHir.as.declarations.parseModule(targetSourceFile.getDirectory(), ctx)];
    } else {
      const mod: abstractions.translator.ModuleAsn = {
        id: random.createUuid(),
        kind: 'ModuleAsn',
        syntaxRole: 'statement',
        identifier: { name: namespaceExport.getName() },
        block: {
          id: random.createUuid(),
          kind: 'BlockAsn',
          syntaxRole: 'statement',
          statements: tsHir.as.declarations.parseModuleBody(targetSourceFile, ctx),
        },
        version: '',
        role: 'SourceFile',
      };
      if (!ctx.enter(mod, exportDecl)) return [];
      return [ctx.leave(mod, exportDecl)];
    }
  }
  // 2. Обработка: export * from './module';
  else if (targetSourceFile) {
    return tsHir.as.declarations.parseModuleBody(targetSourceFile, ctx);
  }
  // 3. Обработка: export { a, b, c }; (Именованные локальные экспорты)
  else if (exportDecl.getNamedExports && exportDecl.getNamedExports().length > 0) {
    const results: abstractions.translator.AsnType[] = [];
    const processedFiles = new Set<string>();
    const currentSourceFile = exportDecl.getSourceFile();

    // Собираем все `import * as name` в текущем файле для 100% точной проверки
    const namespaceImportsMap = new Map<string, any>();
    for (const imp of currentSourceFile.getImportDeclarations?.() || []) {
      const ns = imp.getNamespaceImport?.();
      if (ns) {
        namespaceImportsMap.set(ns.getText(), imp);
      }
    }

    for (const namedExport of exportDecl.getNamedExports()) {
      const localName = namedExport.getName(); // например, 'acl'
      const exportedName = namedExport.getAliasNode()?.getText() || localName;

      // ВАРИАНТ А: Это был `import * as acl from './acl'`
      if (namespaceImportsMap.has(localName)) {
        const importDecl = namespaceImportsMap.get(localName);
        const originSourceFile = importDecl.getModuleSpecifierSourceFile?.();

        if (originSourceFile && originSourceFile !== currentSourceFile) {
          const filePath = originSourceFile.getFilePath();

          if (!processedFiles.has(filePath)) {
            processedFiles.add(filePath);

            // Если хотите такую же логику для index.ts, как в пункте 1 (опционально):
            // if (originSourceFile.getBaseName().startsWith('index.')) {
            //   results.push(tsHir.as.declarations.parseModule(originSourceFile.getDirectory(), ctx));
            //   continue;
            // }

            const mod: abstractions.translator.ModuleAsn = {
              id: random.createUuid(),
              kind: 'ModuleAsn',
              syntaxRole: 'statement',
              identifier: { name: exportedName },
              block: {
                id: random.createUuid(),
                kind: 'BlockAsn',
                syntaxRole: 'statement',
                statements: tsHir.as.declarations.parseModuleBody(originSourceFile, ctx),
              },
              version: '',
              role: 'SourceFile',
            };

            if (ctx.enter(mod, originSourceFile)) {
              results.push(ctx.leave(mod, originSourceFile));
            }
          }
        }
        continue; // Переходим к следующему экспорту
      }

      // ВАРИАНТ Б: Это был обычный `import { MyType } from './module'` или локальная переменная
      const symbol = namedExport.getLocalTargetSymbol?.() || namedExport.getNameNode().getSymbol();
      const originalSymbol = symbol?.getAliasedSymbol() || symbol;
      const declarations = originalSymbol?.getDeclarations();

      if (declarations && declarations.length > 0) {
        const originSourceFile = declarations[0].getSourceFile();

        if (originSourceFile && originSourceFile !== currentSourceFile) {
          const filePath = originSourceFile.getFilePath();

          if (!processedFiles.has(filePath)) {
            processedFiles.add(filePath);
            results.push(...tsHir.as.declarations.parseModuleBody(originSourceFile, ctx));
          }
        }
      }
    }

    return results;
  }

  return [];
}
