import { Node, SyntaxKind, VariableDeclaration } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';

// Define the priority order (lower number = comes first)
const kindOrder: Partial<Record<SyntaxKind, number>> = {
  [SyntaxKind.ClassDeclaration]: 1,
  [SyntaxKind.FunctionDeclaration]: 2,
  [SyntaxKind.InterfaceDeclaration]: 3,
  [SyntaxKind.VariableDeclaration]: 4,
};

/**
 * Sorts declaration nodes by:
 * 1. Class
 * 2. Function
 * 3. Interface
 * 4. Variable
 *
 * (Ties of the same kind are ordered by their appearance in the file)
 */
function sortDeclarations<T extends Node>(nodes: T[]): T[] {
  return [...nodes].sort((a, b) => {
    const priorityA = kindOrder[a.getKind()] ?? Infinity;
    const priorityB = kindOrder[b.getKind()] ?? Infinity;

    // 1. Sort by kind priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 2. Tie-breaker: Preserve original order in file
    return a.getStart() - b.getStart();
  });
}

export async function renameFileBasedOnFirstChild({ sourceFile, project }: tsRefactor.IterateSourceFileState) {
  const declarations = sourceFile.getDescendants().filter((node) => {
    // 1. Check if it is the Kind we want
    const kind = node.getKind();
    const isTargetKind =
      kind === SyntaxKind.InterfaceDeclaration ||
      kind === SyntaxKind.FunctionDeclaration ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.ClassDeclaration;

    if (!isTargetKind) return false;

    // 2. Check if it is Exported
    // Node.isExportable acts as a type guard so TypeScript knows .isExported() exists
    if (Node.isExportable(node)) {
      return node.isExported();
    }

    return false;
  });
  if (!declarations.length) {
    return;
  }

  const sortedDeclarations = sortDeclarations(declarations);
  const declaration = sortedDeclarations[0];

  const name = tsRefactor.toSafeFilename((declaration as VariableDeclaration).getName() || '');
  if (!name) {
    return;
  }
  const { baseName, ext } = tsRefactor.getNameAndExt(sourceFile);

  if (name == baseName) {
    return;
  }

  const path = `${sourceFile.getDirectory().getPath()}/${name}${ext}`;
  console.log(`${sourceFile.getDirectory().getPath()} ${baseName} → ${name}`);
  sourceFile.move(path);
}
