import * as translators from '@razomy/abstracts/translators';
import { parseModuleBody } from "./parse_module_body";
import { parseModule } from "./parse_module";

export function parseExport(exportDecl: any): translators.AstType[] {
  const namespaceExport = exportDecl.getNamespaceExport();
  const targetSourceFile = exportDecl.getModuleSpecifierSourceFile();

  if (namespaceExport && targetSourceFile) {
    if (targetSourceFile.getBaseName().startsWith('index.')) {
      return [parseModule(targetSourceFile.getDirectory())];
    } else {
      return [{
        kind: 'ModuleAst', syntaxLayer: 3,
        identifier: { name: namespaceExport.getName() },
        block: { kind: 'BlockAst', syntaxLayer: 3, statements: parseModuleBody(targetSourceFile) },
        version: '', role: 'SourceFile', dependencies: [], runtime: { kind: 'ImportAst', syntaxLayer: 3, identifier: { name: '' }, path: '', version: '' }
      }];
    }
  } else if (targetSourceFile) {
    return parseModuleBody(targetSourceFile);
  }
  return [];
}
