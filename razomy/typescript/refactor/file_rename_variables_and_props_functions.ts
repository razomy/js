import {SourceFile, SyntaxKind} from 'ts-morph';
import {flat} from 'razomy.array';
import {rename_node} from './rename_node';
import {IterateSourceFileState} from './iterate_source_files_and_save';

export function file_rename_variables_and_props_functions({ source_file, project }: IterateSourceFileState) {
  const functions = source_file.getDescendantsOfKind(SyntaxKind.FunctionDeclaration);
  const parameters = flat(
    functions.map(decl => decl.getParameters()))
    .filter(i => !!i);
  const files = [
    ...source_file.getDescendantsOfKind(SyntaxKind.VariableDeclaration),
    ...source_file.getDescendantsOfKind(SyntaxKind.PropertyDeclaration),
    ...source_file.getDescendantsOfKind(SyntaxKind.PropertySignature),
    ...functions,
    ...parameters,
    ...source_file.getDescendantsOfKind(SyntaxKind.MethodDeclaration),
  ]
  for (let variable_declaration of files) {
    if (variable_declaration.wasForgotten()) {
      continue
    }
    rename_node(variable_declaration)
  }
}