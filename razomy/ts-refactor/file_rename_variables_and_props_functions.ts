import { SyntaxKind } from 'ts-morph';
import * as array from '@razomy/array';
import * as tsRefactor from "@razomy/ts-refactor";

export function fileRenameVariablesAndPropsFunctions({ sourceFile, project }: tsRefactor.IterateSourceFileState) {
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
  for (const variableDeclaration of files) {
    if (variableDeclaration.wasForgotten()) {
      continue;
    }
    if (variableDeclaration.getParentIfKind(SyntaxKind.InterfaceDeclaration)?.getFullText().includes('ProcessEnv')) {
      continue;
    }

    tsRefactor.renameNode(variableDeclaration);
  }
}
