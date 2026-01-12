import { Project, SyntaxKind, SourceFile, Node } from 'ts-morph';

const to_snake_case = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const convert_to_default_export = async () => {
  const project = new Project({ tsConfigFilePath: '../../../../tsconfig.json' });
  const source_files = project.getSourceFiles();

  for (const file of source_files) {
    const base_name = file.getBaseNameWithoutExtension();
    if (base_name === 'index') continue;

    // 1. Find the Exported Declaration matching the filename
    // We try to match "get" (filename) with "const get" or "function get"
    const exported_decls = file.getExportedDeclarations();
    let main_decl_name: string | undefined;

    // Logic: Look for exact match or snake_case match
    for (const [name] of exported_decls) {
      if (name === base_name || name === to_snake_case(base_name)) {
        main_decl_name = name;
        break;
      }
    }

    if (!main_decl_name) continue;

    const decls = exported_decls.get(main_decl_name);
    if (!decls || decls.length === 0) continue;

    const main_decl = decls[0]; // The variable/function declaration node

    // 2. Find all references in other files BEFORE modifying
    // This finds "import { get } from ... "
    const references = main_decl.findReferencesAsNodes();

    // 3. Remove 'export' keyword from the definition
    // e.g. "export const get = ..." becomes "const get = ..."
    const export_keyword = main_decl.getParent()?.getChildren().find(c => c.getKind() === SyntaxKind.ExportKeyword)
      || main_decl.getModifiers().find(m => m.getKind() === SyntaxKind.ExportKeyword);

    if (export_keyword && Node.isExportGetable(main_decl)) {
      main_decl.setIsExported(false);
    }

    // 4. Add "export default [name]" at the end of the file
    file.addExportAssignment({
      isExportEquals: false,
      expression: main_decl_name,
    });

    console.log(`[UPDATED FILE] ${file.getFilePath()} -> export default ${main_decl_name}`);

    // 5. Update Imports in other files
    for (const ref of references) {
      // Handle: import { get } from './get'
      const import_specifier = ref.getParentIfKind(SyntaxKind.ImportSpecifier);
      if (import_specifier) {
        const import_decl = import_specifier.getImportDeclaration();

        // Remove the named import "{ get }"
        import_specifier.remove();

        // Add default import "get"
        // If import becomes "import get, { other } from...", this handles it.
        // If import becomes "import get from ...", this handles it.
        import_decl.setDefaultImport(main_decl_name);
        console.log(`  - Updated import in: ${import_decl.getSourceFile().getBaseName()}`);
      }

      // Handle: import * as get from './get' (if used in index files previously)
      const namespace_import = ref.getParentIfKind(SyntaxKind.NamespaceImport);
      if (namespace_import) {
        const import_decl = namespace_import.getImportDeclaration();
        // Change "import * as get" to "import get"
        namespace_import.remove();
        import_decl.setDefaultImport(main_decl_name);
        console.log(`  - Updated namespace import in: ${import_decl.getSourceFile().getBaseName()}`);
      }
    }
  }

  await project.save();
};

convert_to_default_export();