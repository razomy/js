import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseExport(exportDecl: any): abstracts.translators.AstType[] {
  const namespaceExport = exportDecl.getNamespaceExport();
  const targetSourceFile = exportDecl.getModuleSpecifierSourceFile();

  if (namespaceExport && targetSourceFile) {
    if (targetSourceFile.getBaseName().startsWith('index.')) {
      return [tsRl.ast.bindings.parseModule(targetSourceFile.getDirectory())];
    } else {
      return [{
        kind: 'ModuleAst', syntaxLayer: 3,
        identifier: { name: namespaceExport.getName() },
        block: { kind: 'BlockAst', syntaxLayer: 3, statements: tsRl.ast.bindings.parseModuleBody(targetSourceFile) },
        version: '', role: 'SourceFile', dependencies: [], runtime: { kind: 'ImportAst', syntaxLayer: 3, identifier: { name: '' }, path: '', version: '' }
      }];
    }
  } else if (targetSourceFile) {
    return tsRl.ast.bindings.parseModuleBody(targetSourceFile);
  }
  return [];
}
