import { SyntaxKind } from 'ts-morph';
import { renameNode } from './rename_node';
import type { IterateSourceFileState } from './iterate_source_files_and_save';
import * as array from '@razomy/array';

export function fileRenameVariablesAndPropsFunctions({ sourceFile, project }: IterateSourceFileState) {
  const functions = sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration);
  const parameters = array.flat(functions.map((decl) => decl.getParameters())).filter((i) => !!i);
  const files = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.PropertyDeclaration),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.PropertySignature),
    ...functions,
    ...parameters,
    ...sourceFile.getDescendantsOfKind(SyntaxKind.MethodDeclaration),
  ];
  for (let variableDeclaration of files) {
    if (variableDeclaration.wasForgotten()) {
      continue;
    }
    if (variableDeclaration.getParentIfKind(SyntaxKind.InterfaceDeclaration)?.getFullText().includes('ProcessEnv')) {
      continue;
    }

    renameNode(variableDeclaration);
  }
}
