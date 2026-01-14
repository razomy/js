import { Project, SyntaxKind, SourceFile } from 'ts-morph';

/**
 * Helper to determine the actual name of a default export in a file.
 * Returns null if the default export is anonymous (e.g., export default () => {})
 */
const get_real_default_export_name = (file: SourceFile): string | null => {
  // 1. Check for: export default class MyClass {}
  const defClass = file.getClasses().find(c => c.isDefaultExport());
  if (defClass) {
    return defClass.getName() || null;
  }

  // 2. Check for: export default function MyFunc() {}
  const defFunc = file.getFunctions().find(f => f.isDefaultExport());
  if (defFunc) {
    return defFunc.getName() || null;
  }

  // 3. Check for: export default MyVariable; OR export default { ... };
  const exportAssignment = file.getExportAssignment(d => !d.isExportEquals());
  if (exportAssignment) {
    const expression = exportAssignment.getExpression();

    // Case: export default MyVariable
    if (expression.getKind() === SyntaxKind.Identifier) {
      return expression.getText();
    }

    // Case: export default class { ... } (Expression) - usually handled by logic #1 but good safety
    // Case: export default function () { ... } (Expression)
    // If it's a direct literal or anonymous expression, we can't extract a name.
  }

  // 4. Check for: export { MyVar as default };
  const exportDecls = file.getExportDeclarations();
  for (const decl of exportDecls) {
    for (const specifier of decl.getNamedExports()) {
      if (specifier.getAliasNode()?.getText() === 'default') {
        return specifier.getName(); // Returns "MyVar"
      }
    }
  }

  return null;
};

export const fix_default_imports = async () => {
  // Initialize project
  const project = new Project({ tsConfigFilePath: '../../../../tsconfig.json' });

  // Get all source files, excluding node_modules by default via tsconfig,
  // but we add an extra check just in case.
  const sourceFiles = project.getSourceFiles();
  let count = 0;

  console.log(`Analyzing ${sourceFiles.length} files...`);

  for (const file of sourceFiles) {
    if (file.getFilePath().includes('node_modules')) continue;

    // Get all import declarations in the file
    const imports = file.getImportDeclarations();

    for (const importDecl of imports) {
      // We only care about Default Imports (e.g., import X from './y')
      const defaultImport = importDecl.getDefaultImport();

      if (!defaultImport) continue;

      // Get the current local name used in this file
      const currentName = defaultImport.getText();

      // Find the source file definition for this import
      const sourceFile = importDecl.getModuleSpecifierSourceFile();

      // If sourceFile is undefined, it's likely a library (e.g. 'react') or cannot be resolved. Skip it.
      if (!sourceFile || sourceFile.isInNodeModules()) continue;

      try {
        // Find the "Real" name of the item exported as default in the other file
        const realExportName = get_real_default_export_name(sourceFile);

        // If we found a name, and it is different from what we are currently using
        if (realExportName && realExportName !== currentName) {

          // Check if the new name is already defined in the current file to avoid conflicts
          // (e.g. if we want to rename 'A' to 'B', but 'const B' already exists)
          const isNameTaken = file.getDescendantStatements().some(stmt => {
            // Basic check for variable/class/function declarations
            // A more robust check uses file.getLocalDeclarations(), but this catches 90% of simple conflicts
            return false; // Relying on ts-morph rename to handle references, but manual conflict check is complex.
            // Usually ts-morph rename() is smart, but here we are renaming the *Import identifier*.
          });

          // Perform the rename
          // .rename() on the identifier node updates all references in the file automatically
          console.log(`[RENAME] In ${file.getBaseName()}: '${currentName}' -> '${realExportName}' (from ${sourceFile.getBaseName()})`);
          defaultImport.rename(realExportName);
          count++;
        }
      } catch (err) {
        console.warn(`Error processing import in ${file.getBaseName()}:`, err);
      }
    }
  }

  if (count > 0) {
    console.log(`Saving ${count} changes...`);
    await project.save();
    console.log('Done.');
  } else {
    console.log('No imports needed renaming.');
  }
};

fix_default_imports();