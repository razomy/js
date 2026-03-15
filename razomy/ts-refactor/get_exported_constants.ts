import { Node, SourceFile, VariableDeclarationKind } from 'ts-morph';

/**
 * 3. Get all exported constants from the specified directory.
 * Ignores functions, classes, types, etc.
 */
export function getExportedConstants(files: SourceFile[]): { path: string, name: string }[] {
  const constantNames: { path: string, name: string }[] = [];
  for (const file of files) {
    const exports = file.getExportedDeclarations();

    for (const [name, declarations] of exports) {
      const decl = declarations[0];

      // We only care about variables
      if (Node.isVariableDeclaration(decl)) {
        const varStatement = decl.getVariableStatement();
        const initializer = decl.getInitializer();

        // Check if it's explicitly a CONST
        const isConst = varStatement?.getDeclarationKind() === VariableDeclarationKind.Const;

        // Ensure it is NOT a function (we handle those in getExportedFunctions)
        const isFunction = initializer && (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer));

        if (isConst && !isFunction) {
          constantNames.push({path: file.getFilePath(), name});
        }
      }
    }
  }

  return constantNames;
}