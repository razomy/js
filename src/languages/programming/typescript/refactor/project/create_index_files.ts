import {Project, SyntaxKind} from 'ts-morph';
import {to_safe_name} from 'razomy.languages/programming/typescript/refactor/rename_node';
import {read_file_json} from 'razomy.fs/file';
import path from 'path';
import {file} from 'razomy.fs';
import {if_main} from 'razomy.main';

export async function create_index_files() {
  const root = '../../../../../../'
  const project = new Project({tsConfigFilePath: root + 'tsconfig.json'});

  const directories = project.getDirectories();
  for (const dir of directories) {
    if (dir.getPath().includes('node_modules')) continue;
    const dir_path = dir.getPath();
    const export_entries: string[] = [];

    for (const sub_dir of dir.getDirectories()) {
      if (sub_dir.getPath().includes('node_modules')) continue;
      const safe_key = to_safe_name(sub_dir.getBaseName());
      const child_package_json_path = path.join(sub_dir.getPath(), 'package.json');
      if (file.is_exist(child_package_json_path)) {
        const name = read_file_json(child_package_json_path).name;
        export_entries.push(`export * as ${safe_key} from '${name}';`);
      } else {
        export_entries.push(`export * as ${safe_key} from './${sub_dir.getBaseName()}';`);
      }
    }

    // 2. Files
    for (const file of dir.getSourceFiles()) {
      if (file.getFilePath().includes('node_modules')) continue;
      const base_name = file.getBaseNameWithoutExtension();
      // Skip index.ts and tests
      if (base_name === 'index' || file.getBaseName().match(/\.(spec|test)\./)) continue;

      // --- Analyze Exports ---
      const exported_declarations = file.getExportedDeclarations();
      let has_types_or_classes = false;
      const names_to_export: string[] = [];

      // Проходимся по всем экспортам, чтобы понять состав файла
      for (const [name, decls] of exported_declarations) {
        const decl = decls[0];
        const kind = decl.getKind();

        names_to_export.push(name);

        // Проверяем наличие Типов, Интерфейсов или Классов
        if (
          kind === SyntaxKind.ClassDeclaration ||
          kind === SyntaxKind.InterfaceDeclaration ||
          kind === SyntaxKind.TypeAliasDeclaration ||
          kind === SyntaxKind.FunctionDeclaration ||
          kind === SyntaxKind.VariableDeclaration ||
          kind === SyntaxKind.EnumDeclaration
        ) {
          has_types_or_classes = true;
        }
      }

      // Если есть типы, интерфейсы или классы -> экспортируем их имена напрямую
      if (has_types_or_classes) {
        if (names_to_export.length > 0) {
          export_entries.push(`export { ${names_to_export.join(', ')} } from './${base_name}';`);
        }
      }
      // Иначе (только утилиты/константы) -> экспортируем как пространство имен (имя файла snake_case)
      else {
        export_entries.push(`export * as ${base_name} from './${base_name}';`);
      }
    }

    // Only write if we have exports
    if (export_entries.length > 0) {
      const index_content = [
        export_entries.join('\n'),
        '' // New line at end of file
      ].join('\n');

      const index_file_path = `${dir_path}/index.ts`;
      project.createSourceFile(index_file_path, index_content, {overwrite: true});
      console.log(`[GENERATED] ${index_file_path}`);
    }
  }

  await project.save();
}

if_main(import.meta.url, create_index_files).then();
