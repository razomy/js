import {Directory} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseModuleDeclarationBody} from "./parse_module_declaration_body";


export function parseModuleDeclaration(
  node: Directory,
): abstracts.translators.ModuleBinding {
  const indexFile = node.getSourceFile(f => f.getBaseName().startsWith("index."))!;
  if(!indexFile){
    throw new Error("NO index file")
  }
  const body = parseModuleDeclarationBody(indexFile);
  // Имя модуля: либо переданное (для подмодулей), либо имя папки
  const moduleName = node.getBaseName()|| '';

  return {
    kind: 'ModuleBinding',
    identifier: { kind: 'Identifier', name: moduleName },
    body: body,
    description: '',
  };
}
