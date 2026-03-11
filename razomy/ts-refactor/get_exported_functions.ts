import {Node, SourceFile} from 'ts-morph';

/**
 * 2. Get all exported functions from the specified directory.
 * Extracts standard functions and arrow functions assigned to variables.
 */
export function getExportedFunctions(files: SourceFile[]): string[] {
  const functionNames: string[] = [];

  for (const file of files) {
    const exports = file.getExportedDeclarations();

    for (const [name, declarations] of exports) {
      const decl = declarations[0];

      // Check if it's a standard function: export function myFunc() {}
      if (Node.isFunctionDeclaration(decl)) {
        functionNames.push(name);
      }
      // Check if it's a variable holding an arrow function: export const myFunc = () => {}
      else if (Node.isVariableDeclaration(decl)) {
        const initializer = decl.getInitializer();
        if (initializer && (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer))) {
          functionNames.push(name);
        }
      }
    }
  }

  return functionNames;
}
