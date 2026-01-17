import { levenshtein_distance } from 'razomy.string/levenshtein_distance';
import { Project, ImportDeclaration, ExportDeclaration, SourceFile } from 'ts-morph';

/**
 * Index of all exported symbols in the project.
 * Map<SymbolName, SourceFileWhereItIsDefined>
 */
type ExportIndex = Map<string, SourceFile>;

/**
 * Helper to find the best match for a missing symbol.
 * Checks exact match first, then fuzzy match.
 */
function find_replacement_symbol(
  name_to_find: string,
  export_map: ExportIndex,
  all_export_names: string[]
): { name: string; file: SourceFile } | null {

  // 1. Try Exact Match
  if (export_map.has(name_to_find)) {
    return { name: name_to_find, file: export_map.get(name_to_find)! };
  }

  // 2. Try Fuzzy Match
  let lowest_distance = Infinity;
  let current_best_candidate = '';
  const max_distance_threshold = 3; // Strictness of similarity

  for (const candidate of all_export_names) {
    const distance = levenshtein_distance(name_to_find, candidate);
    if (distance < lowest_distance) {
      lowest_distance = distance;
      current_best_candidate = candidate;
    }
  }

  if (lowest_distance <= max_distance_threshold) {
    console.log(`    -> Fuzzy match found: '${name_to_find}' replaced with '${current_best_candidate}' (Distance: ${lowest_distance})`);
    return {
      name: current_best_candidate,
      file: export_map.get(current_best_candidate)!
    };
  }

  return null;
}

export async function fix_broken_imports_and_exports(project_path: string) {
  console.log('Initializing project...');
  const project = new Project({
    tsConfigFilePath: project_path + 'tsconfig.json',
  });

  const source_files = project.getSourceFiles();

  // ==========================================
  // PHASE 1: INDEX ALL EXPORTS
  // ==========================================
  console.log('Indexing all exported symbols...');
  const export_map: ExportIndex = new Map();
  const all_export_names: string[] = [];

  for (const file of source_files) {
    const exports = file.getExportedDeclarations();
    for (const [name, _] of exports) {
      if (name !== 'default') {
        export_map.set(name, file);
        all_export_names.push(name);
      }
    }
  }

  // ==========================================
  // PHASE 2: SCAN & FIX FILES
  // ==========================================
  for (const file of source_files) {

    // --- PART A: FIX IMPORTS ---
    const broken_imports: ImportDeclaration[] = [];
    for (const import_decl of file.getImportDeclarations()) {
      if (import_decl.isModuleSpecifierRelative() && !import_decl.getModuleSpecifierSourceFile()) {
        broken_imports.push(import_decl);
      }
    }

    if (broken_imports.length > 0) {
      console.log(`Fixing IMPORTS in ${file.getBaseName()}...`);

      for (const import_decl of broken_imports) {
        const named_imports = import_decl.getNamedImports();

        for (const named of named_imports) {
          const match = find_replacement_symbol(named.getName(), export_map, all_export_names);

          if (match) {
            // Check if we already have an import statement for this file
            const existing_import = file.getImportDeclaration(
              i => i.getModuleSpecifierSourceFile() === match.file
            );

            if (existing_import) {
              const already_has_name = existing_import.getNamedImports().some(n => n.getName() === match.name);
              if (!already_has_name) existing_import.addNamedImport(match.name);
            } else {
              file.addImportDeclaration({
                namedImports: [match.name],
                moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(match.file)
              });
            }
            console.log(`    -> Fixed Import: ${match.name} from ${match.file.getBaseName()}`);
          }
        }
        import_decl.remove();
      }
    }

    // --- PART B: FIX RE-EXPORTS ---
    // Look for: export { Foo } from './broken-path';
    const broken_exports: ExportDeclaration[] = [];
    for (const export_decl of file.getExportDeclarations()) {
      if (export_decl.isModuleSpecifierRelative() && !export_decl.getModuleSpecifierSourceFile()) {
        broken_exports.push(export_decl);
      }
    }

    if (broken_exports.length > 0) {
      console.log(`Fixing EXPORTS in ${file.getBaseName()}...`);

      for (const export_decl of broken_exports) {
        const named_exports = export_decl.getNamedExports();

        // Note: We cannot fix `export * from './broken'` because we don't know what symbols to look for.
        // We only fix named exports.
        for (const named of named_exports) {
          const match = find_replacement_symbol(named.getName(), export_map, all_export_names);

          if (match) {
            // Check if we already have an export statement for this file
            const existing_export = file.getExportDeclaration(
              e => e.getModuleSpecifierSourceFile() === match.file
            );

            if (existing_export) {
              const already_has_name = existing_export.getNamedExports().some(n => n.getName() === match.name);
              if (!already_has_name) existing_export.addNamedExport(match.name);
            } else {
              file.addExportDeclaration({
                namedExports: [match.name],
                moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(match.file)
              });
            }
            console.log(`    -> Fixed Export: ${match.name} from ${match.file.getBaseName()}`);
          }
        }
        // Remove the broken line
        export_decl.remove();
      }
    }
  }

  await project.save();
  console.log('Done.');
}