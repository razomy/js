import { Node, SyntaxKind, VariableDeclaration } from 'ts-morph';
import * as tsRefactor from '@razomy/ts-refactor';

export async function renameFileBasedOnFirstChild({ sourceFile, project }: tsRefactor.IterateSourceFileState) {
  const declaration = sourceFile.getFirstDescendant((node) => {
    // 1. Check if it is the Kind we want
    const kind = node.getKind();
    const isTargetKind =
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
  if (!declaration) {
    return;
  }

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
