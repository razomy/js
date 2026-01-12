import {ImportDeclaration, Node, Project, SyntaxKind} from 'ts-morph';

const to_snake_case = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const convert_to_default_export = async () => {
  // Initialize project
  const project = new Project({tsConfigFilePath: '../../../../tsconfig.json'});
  const source_files = project.getSourceFiles();

  for (const file of source_files) {
    try {
      const base_name = file.getBaseNameWithoutExtension();
      if (base_name === 'index') continue;

      // 1. Find the Exported Declaration
      const exported_decls = file.getExportedDeclarations();
      let main_decl_name: string | undefined;

      // Find main declaration matching filename (exact or snake_case)
      for (const [name] of exported_decls) {
        if (name === base_name || name === to_snake_case(base_name)) {
          main_decl_name = name;
          break;
        }
      }

      if (!main_decl_name) continue;

      const decls = exported_decls.get(main_decl_name);
      if (!decls || decls.length === 0) continue;

      const main_decl = decls[0] as any;

      // 2. Collect Import Declarations to modify (Snapshoting)
      // We collect the ImportDeclaration nodes immediately to avoid node invalidation issues
      const imports_to_update: { decl: ImportDeclaration, type: 'named' | 'namespace' }[] = [];
      const references = main_decl.findReferencesAsNodes();

      for (const ref of references) {

        const import_specifier = ref.getParentIfKind(SyntaxKind.ImportSpecifier);
        if (import_specifier) {
          imports_to_update.push({
            decl: import_specifier.getImportDeclaration(),
            type: 'named'
          });
          continue;
        }

        const namespace_import = ref.getParentIfKind(SyntaxKind.NamespaceImport);
        if (namespace_import) {
          imports_to_update.push({
            decl: namespace_import.getImportDeclaration(),
            type: 'namespace'
          });
        }
      }

      // Deduplicate imports (in case multiple refs point to same import line)
      const unique_imports = [...new Set(imports_to_update.map(i => i.decl))]
        .map(decl => imports_to_update.find(i => i.decl === decl)!);

      // 3. Modify the Source Export
      // Remove 'export' keyword
      const export_keyword = main_decl.getParent()?.getChildren().find(c => c.getKind() === SyntaxKind.ExportKeyword)
        || main_decl.getModifiers().find(m => m.getKind() === SyntaxKind.ExportKeyword);

      if (export_keyword && Node.isExportGetable(main_decl)) {
        main_decl.setIsExported(false);
      }

      // Add 'export default' at the end
      // Check if assignment already exists to avoid duplicates on re-run
      const existing_export = file.getExportAssignment(e => !e.isExportEquals() && e.getExpression().getText() === main_decl_name);
      if (!existing_export) {
        file.addExportAssignment({
          isExportEquals: false,
          expression: main_decl_name,
        });
        console.log(`[UPDATED FILE] ${file.getFilePath()} -> export default ${main_decl_name}`);
      }

      // 4. Update Imports in other files
      for (const {decl, type} of unique_imports) {
        // Check if node is still in AST (it should be, as we are in a different file)
        if (decl.wasForgotten()) continue;

        if (type === 'named') {
          // Remove the specific named import "{ create }"
          const named_import = decl.getNamedImports().find(n => n.getName() === main_decl_name);
          if (named_import) {
            named_import.remove();
            // Add default import
            decl.setDefaultImport(main_decl_name);
            console.log(`  - Fixed Named import in: ${decl.getSourceFile().getBaseName()}`);
          }
        } else if (type === 'namespace') {
          // Remove "* as create"
          const ns_import = decl.getNamespaceImport() as any;
          if (ns_import) {
            ns_import.remove();
            // Add default import
            decl.setDefaultImport(main_decl_name);
            console.log(`  - Fixed Namespace import in: ${decl.getSourceFile().getBaseName()}`);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  await project.save();
};

convert_to_default_export();