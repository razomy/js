import path from 'path';
import { IterateSourceFileState } from '../iterate_source_files_and_save';
import { to_safe_name } from '../to_safe_name';
import { Node, SyntaxKind } from 'ts-morph';

export async function split_functions({ source_file, project }: IterateSourceFileState) {
  // We only care about exported functions at the top level
  const exported_functions = source_file.getFunctions().filter(f => f.isExported());

  if (exported_functions.length <= 1) {
    return;
  }

  console.log(`Processing: ${source_file.getBaseName()} (${exported_functions.length} functions found)`);

  // Keep the first function, move the rest
  const functions_to_move = exported_functions.slice(1);

  for (const func of functions_to_move) {
    const func_name = func.getName();
    if (!func_name) continue;

    const new_filename = `${to_safe_name(func_name)}.ts`;
    const dir_path = source_file.getDirectoryPath();
    const new_file_path = path.join(dir_path, new_filename);

    if (project.getSourceFile(new_file_path)) {
      console.warn(`  [SKIP] File ${new_filename} already exists.`);
      continue;
    }

    try {
      // 1. Create the new file
      const new_source_file = project.createSourceFile(new_file_path, '');

      // 2. Copy imports
      const import_decls = source_file.getImportDeclarations();
      for (const import_decl of import_decls) {
        new_source_file.addImportDeclaration(import_decl.getStructure());
      }

      // --- STEP 2.5: Find and Copy Local Dependencies ---
      // We look for identifiers inside the function being moved.
      // If they point to a declaration in the *current* file that is NOT exported, we copy it.

      const distinct_dependencies = new Set<string>(); // To avoid duplicates
      const dependencies_code: string[] = [];

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
        if (decl.getSourceFile() !== source_file) continue;

        // Ensure it is a top-level node (child of the source file)
        // We walk up parents until we find the node directly under the SourceFile
        let top_level_node = decl;
        while (top_level_node.getParent() && top_level_node.getParent() !== source_file) {
          top_level_node = top_level_node.getParent()!;
        }

        // Skip if it's the function itself we are moving
        if (top_level_node === func) continue;

        // Skip if it is an import declaration (we already copied those)
        if (Node.isImportDeclaration(top_level_node)) continue;

        // Skip if it is already exported (we assume exported things should be imported, not copied)
        // Note: You might need to add an import to the old file here if you want to reference the old file,
        // but typically helper functions are not exported.
        if (Node.isExportable(top_level_node) && top_level_node.isExported()) continue;

        // Get the text of the dependency
        const dependency_text = top_level_node.getFullText();

        // Add to list if we haven't already
        if (!distinct_dependencies.has(dependency_text)) {
          distinct_dependencies.add(dependency_text);
          dependencies_code.push(dependency_text);
        }
      }

      // Add the found dependencies to the new file BEFORE the main function
      if (dependencies_code.length > 0) {
        new_source_file.addStatements(dependencies_code.join('\n'));
      }
      // -----------------∂---------------------------------

      // 3. Move the function text to the new file
      new_source_file.addFunction(func.getStructure() as any);

      // 4. Remove the function from the old file
      func.remove();

      // // 5. Add re-export
      // source_file.addExportDeclaration({
      //   moduleSpecifier: `./${to_safe_name(func_name)}`,
      // });

      // 6. Clean up the NEW file
      // This removes imports we copied but didn't actually use
      new_source_file.fixUnusedIdentifiers();
      await new_source_file.save(); // It's good practice to save intermediate steps if processing is heavy

      console.log(`  [MOVED] ${func_name} -> ${new_filename} (copied ${dependencies_code.length} deps)`);

    } catch (e) {
      console.error(`  [ERROR] Could not move ${func_name}:`, e);
      // Clean up the failed file creation
      const failed_file = project.getSourceFile(new_file_path);
      if (failed_file) failed_file.delete();
    }
  }

  // 7. Clean up the ORIGINAL file
  // This is CRITICAL: Since we moved the function, the helpers (non-exported functions)
  // remaining in the old file might now be unused.
  // fixUnusedIdentifiers() will delete them from the old file if they are no longer used.
  source_file.fixUnusedIdentifiers();
}