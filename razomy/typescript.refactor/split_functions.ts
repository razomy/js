import path from 'path';
import {IterateSourceFileState} from './iterate_source_files_and_save';
import {Node, SyntaxKind} from 'ts-morph';
import {toSafeFilename} from './to_safe_filename';

export async function splitFunctions({sourceFile, project}: IterateSourceFileState) {
  // We only care about exported functions at the top level
  const exportedFunctions = sourceFile.getFunctions().filter(f => f.isExported());

  if (exportedFunctions.length <= 1) {
    return;
  }

  console.log(`Processing: ${sourceFile.getBaseName()} (${exportedFunctions.length} functions found)`);

  // Keep the first function, move the rest
  const functionsToMove = exportedFunctions.slice(1);

  for (const func of functionsToMove) {
    const funcName = func.getName();
    if (!funcName) continue;

    const newFilename = `${toSafeFilename(funcName)}.ts`;
    const dirPath = sourceFile.getDirectoryPath();
    const newFilePath = path.join(dirPath, newFilename);

    if (project.getSourceFile(newFilePath)) {
      console.warn(`  [SKIP] File ${newFilename} already exists.`);
      continue;
    }

    try {
      // 1. Create the new file
      const newSourceFile = project.createSourceFile(newFilePath, '');

      // 2. Copy imports
      const importDecls = sourceFile.getImportDeclarations();
      for (const importDecl of importDecls) {
        newSourceFile.addImportDeclaration(importDecl.getStructure());
      }

      // --- STEP 2.5: Find and Copy Local Dependencies ---
      // We look for identifiers inside the function being moved.
      // If they point to a declaration in the *current* file that is NOT exported, we copy it.

      const distinctDependencies = new Set<string>(); // To avoid duplicates
      const dependenciesCode: string[] = [];

      // Get all identifiers (variable names, function calls) in the function body
      const identifiers = func.getDescendantsOfKind(SyntaxKind.Identifier);

      for (const id of identifiers) {
        const symbol = id.getSymbol();
        if (!symbol) continue;

        const declarations = symbol.getDeclarations();
        if (!declarations || declarations.length === 0) continue;

        // Take the first declaration (usually sufficient for local vars/funcs)
        const decl = declarations[0];

        // Ensure the declaration is inside the ORIGINAL source file
        if (decl.getSourceFile() !== sourceFile) continue;

        // Ensure it is a top-level node (child of the source file)
        // We walk up parents until we find the node directly under the SourceFile
        let topLevelNode = decl;
        while (topLevelNode.getParent() && topLevelNode.getParent() !== sourceFile) {
          topLevelNode = topLevelNode.getParent()!;
        }

        // Skip if it's the function itself we are moving
        if (topLevelNode === func) continue;

        // Skip if it is an import declaration (we already copied those)
        if (Node.isImportDeclaration(topLevelNode)) continue;

        // Skip if it is already exported (we assume exported things should be imported, not copied)
        // Note: You might need to add an import to the old file here if you want to reference the old file,
        // but typically helper functions are not exported.
        if (Node.isExportable(topLevelNode) && topLevelNode.isExported()) continue;

        // Get the text of the dependency
        const dependencyText = topLevelNode.getFullText();

        // Add to list if we haven't already
        if (!distinctDependencies.has(dependencyText)) {
          distinctDependencies.add(dependencyText);
          dependenciesCode.push(dependencyText);
        }
      }

      // Add the found dependencies to the new file BEFORE the main function
      if (dependenciesCode.length > 0) {
        newSourceFile.addStatements(dependenciesCode.join('\n'));
      }
      // -----------------∂---------------------------------

      // 3. Move the function text to the new file
      newSourceFile.addFunction(func.getStructure() as any);

      // 4. Remove the function from the old file
      func.remove();

      // // 5. Add re-export
      // source_file.addExportDeclaration({
      //   moduleSpecifier: `./${to_safe_name(func_name)}`,
      // });

      // 6. Clean up the NEW file
      // This removes imports we copied but didn't actually use
      newSourceFile.fixUnusedIdentifiers();
      await newSourceFile.save(); // It's good practice to save intermediate steps if processing is heavy

      console.log(`  [MOVED] ${funcName} -> ${newFilename} (copied ${dependenciesCode.length} deps)`);

    } catch (e) {
      console.error(`  [ERROR] Could not move ${funcName}:`, e);
      // Clean up the failed file creation
      const failedFile = project.getSourceFile(newFilePath);
      if (failedFile) failedFile.delete();
    }
  }

  // 7. Clean up the ORIGINAL file
  // This is CRITICAL: Since we moved the function, the helpers (non-exported functions)
  // remaining in the old file might now be unused.
  // fixUnusedIdentifiers() will delete them from the old file if they are no longer used.
  sourceFile.fixUnusedIdentifiers();
}