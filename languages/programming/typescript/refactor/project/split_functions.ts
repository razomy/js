import path from 'path';
import {IterateSourceFileState} from '../iterate_source_files_and_save';
import {to_safe_name} from '../to_safe_name';


export async function split_functions({source_file, project}: IterateSourceFileState) {
  // We only care about exported functions at the top level
  const exported_functions = source_file.getFunctions().filter(f => f.isExported());

  // If there is 1 or 0 functions, skip this file
  if (exported_functions.length <= 1) {
    return
  }

  console.log(`Processing: ${source_file.getBaseName()} (${exported_functions.length} functions found)`);

  // We keep the first function in the original file.
  // We iterate through the rest to move them.
  const functions_to_move = exported_functions.slice(1);

  for (const func of functions_to_move) {
    const func_name = func.getName();

    // Skip default exports or unnamed functions
    if (!func_name) continue;

    const new_filename = `${to_safe_name(func_name)}.ts`;
    const dir_path = source_file.getDirectoryPath();
    const new_file_path = path.join(dir_path, new_filename);

    // Check if file already exists to prevent overwriting
    if (project.getSourceFile(new_file_path)) {
      console.warn(`  [SKIP] File ${new_filename} already exists.`);
      continue;
    }

    try {
      // 1. Create the new file
      const new_source_file = project.createSourceFile(new_file_path, '');

      // 2. Copy all imports from the original file to the new file
      // (This ensures the moved function has access to types/libraries it needs)
      const import_decls = source_file.getImportDeclarations();
      for (const import_decl of import_decls) {
        new_source_file.addImportDeclaration(import_decl.getStructure());
      }

      // 3. Move the function text to the new file
      new_source_file.addFunction(func.getStructure() as any);

      // 4. Remove the function from the old file
      func.remove();

      // 5. Add a re-export to the old file (Barrel Pattern)
      // This ensures code importing from the old file doesn't break.
      source_file.addExportDeclaration({
        moduleSpecifier: `./${to_safe_name(func_name)}`,
      });

      // 6. Clean up unused imports in both files
      // (ts-morph can organize imports to remove the ones we copied but didn't use)
      new_source_file.fixUnusedIdentifiers();

      console.log(`  [MOVED] ${func_name} -> ${new_filename}`);

    } catch (e) {
      console.error(`  [ERROR] Could not move ${func_name}:`, e);
    }
  }

  // Clean up imports in the original file (since we removed functions, some imports might be unused now)
  source_file.fixUnusedIdentifiers();
}
