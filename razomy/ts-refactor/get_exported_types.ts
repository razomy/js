import { Node, SourceFile } from 'ts-morph';

export function getExportedTypes(files: SourceFile[]): { path: string; name: string }[] {
  const functionNames: { path: string; name: string }[] = [];
  for (const file of files) {
    const exports = file.getExportedDeclarations();

    for (const [name, declarations] of exports) {
      const decl = declarations[0];

      // Check if it's a standard function: export function myFunc() {}
      if (Node.isTypeAliasDeclaration(decl)) {
        functionNames.push({ path: file.getFilePath(), name });
      }
    }
  }

  return functionNames;
}
