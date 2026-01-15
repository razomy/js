import { Project, SyntaxKind } from 'ts-morph';
import {to_snake_case} from 'razomy.string';

export function transform_path (path: string) {
  // Split path by slashes to handle folders individually
  return path
    .split('/')
    .map(segment => {
      // Don't change relative path indicators
      if (segment === '.' || segment === '..') return segment;
      return to_snake_case(segment);
    })
    .join('/');
}

export async function rename_import_paths () {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const source_files = project.getSourceFiles();
  let count = 0;

  for (const file of source_files) {
    // 1. Get all Import Declarations (import ... from '...')
    const imports = file.getImportDeclarations();

    // 2. Get all Export Declarations (export ... from '...')
    const exports = file.getExportDeclarations();

    const all_declarations = [...imports, ...exports];

    for (const dec of all_declarations) {
      const module_specifier = dec.getModuleSpecifierValue();

      // Skip invalid or empty specifiers
      if (!module_specifier) continue;

      // Skip external libraries (node_modules usually don't start with .)
      if (module_specifier.startsWith('.')) continue;

      const new_path = transform_path(module_specifier);

      if (module_specifier !== new_path) {
        dec.setModuleSpecifier(new_path);
        console.log(`[PATH] ${module_specifier} -> ${new_path}`);
        count++;
      }
    }
  }

  if (count > 0) {
    console.log(`Saving ${count} path updates...`);
    await project.save();
  } else {
    console.log('No import paths needed updating.');
  }
}

rename_import_paths();