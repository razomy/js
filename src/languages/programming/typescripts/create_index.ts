import { Project, SyntaxKind } from 'ts-morph';
import * as path from 'path';

const to_snake_case = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

// Safe key now only checks JS reserved keywords, not namespace collisions
const get_safe_key = (name: string) => {
  const reserved = [
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
    'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if',
    'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw',
    'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static',
    'implements', 'interface', 'package', 'private', 'protected', 'public'
  ];
  let key = to_snake_case(name);
  return reserved.includes(key) ? key + '_' : key;
};

const generate_final_index = async () => {
  const project = new Project({ tsConfigFilePath: '../../../../tsconfig.json' });
  // Ensure we don't accidentally process node_modules
  const root_dir = project.getDirectory('../../../../src') || project.getDirectories()[0];
  const directories = project.getDirectories();

  let count = 0;

  for (const dir of directories) {
    // Skip node_modules or output directories if they were somehow caught
    if (dir.getPath().includes('node_modules')) continue;

    const dir_path = dir.getPath();
    const export_entries: string[] = [];

    // 1. Sub-Directories
    // We assume sub-directories also run this script, meaning they will NOT have a 'default' export anymore.
    // They will be a collection of named exports.
    // So we use 'export * as name' to group them.
    for (const sub_dir of dir.getDirectories()) {
      const safe_key = get_safe_key(sub_dir.getBaseName());
      export_entries.push(`export * as ${safe_key} from './${sub_dir.getBaseName()}';`);
    }

    // 2. Files
    for (const file of dir.getSourceFiles()) {
      try {
        const base_name = file.getBaseNameWithoutExtension();
        // Skip index.ts and tests
        if (base_name === 'index' || file.getBaseName().match(/\.(spec|test)\./)) continue;

        const safe_key = get_safe_key(base_name);

        // --- Analyze Exports ---
        const exportedDeclarations = file.getExportedDeclarations();
        const hasDefaultExport = exportedDeclarations.has('default');

        // --- CASE A: File has a Default Export ---
        // We assume the default export IS the main object (like your _length or _rectangle examples)
        // We export it as a Named Export aliased to the file name.
        if (hasDefaultExport) {
          export_entries.push(`export { default as ${safe_key} } from './${base_name}';`);

          // Note: If you have named exports ALONGSIDE default exports in these files,
          // you might want to uncomment the line below, but usually, it's one or the other.
          // export_entries.push(`export * from './${base_name}';`);
        }

          // --- CASE B: File has only Named Exports ---
        // We group them into an object under the filename (Namespace Import pattern)
        else {
          export_entries.push(`export * as ${safe_key} from './${base_name}';`);

          // --- Optional: Flatten Types ---
          // Since we can't nest types inside the 'const' object created by 'export * as',
          // we re-export Interfaces and Types to the top level so they are accessible.
          for (const [name, decls] of exportedDeclarations) {
            const decl = decls[0];
            const kind = decl.getKind();

            if (kind === SyntaxKind.InterfaceDeclaration || kind === SyntaxKind.TypeAliasDeclaration) {
              // Prevent naming collisions if the type has the same name as the file alias
              if (name !== safe_key) {
                export_entries.push(`export { ${name} } from './${base_name}';`);
              }
            }
          }
        }

      } catch(r) {
        console.log(`Error processing ${file.getBaseName()}:`, r);
      }
    }

    // Only write if we have exports
    if (export_entries.length > 0) {
      const index_content = [
        export_entries.join('\n'),
        '' // New line at end of file
      ].join('\n');

      const index_file_path = `${dir_path}/index.ts`;
      project.createSourceFile(index_file_path, index_content, { overwrite: true });
      console.log(`[GENERATED] ${index_file_path}`);
      count++;
    }
  }

  if (count > 0) await project.save();
};

generate_final_index();