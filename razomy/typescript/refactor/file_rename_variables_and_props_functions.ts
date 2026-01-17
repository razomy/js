import {SyntaxKind} from 'ts-morph';
import {flat} from 'razomy.array';
import {renameNode} from './rename_node';
import {IterateSourceFileState} from './iterate_source_files_and_save';

export function fileRenameVariablesAndPropsFunctions({sourceFile, project}: IterateSourceFileState) {
  const functions = sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration);
  const parameters = flat(
    functions.map(decl => decl.getParameters()))
    .filter(i => !!i);
  const files = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.PropertyDeclaration),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.PropertySignature),
    ...functions,
    ...parameters,
    ...sourceFile.getDescendantsOfKind(SyntaxKind.MethodDeclaration),
  ]
  for (let variableDeclaration of files) {
    if (variableDeclaration.wasForgotten()) {
      continue
    }
    renameNode(variableDeclaration)
  }
}