import {Project, SyntaxKind} from 'ts-morph';
import * as path from 'path';

const to_snake_case = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const to_pascal_case = (str: string) => {
  let ff = str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  return ff
};

const generate_reverse_index = async () => {
  const project = new Project({tsConfigFilePath: '../../../../tsconfig.json'});

  // Get project root absolute path to calculate relative paths later
  const root_dir = project.getDirectory('../../../../src')?.getPath() || process.cwd();

  const directories = project.getDirectories();
  let count = 0;

  for (const dir of directories) {
    const dir_path = dir.getPath();
    const export_statements: string[] = [];

    // 1. Export Sub-Directories (Recursion)
    for (const sub_dir of dir.getDirectories()) {
      export_statements.push(`export * from './${sub_dir.getBaseName()}';`);
    }

    // 2. Process Files
    for (const file of dir.getSourceFiles()) {
      const base_name = file.getBaseNameWithoutExtension();
      if (base_name === 'index') continue;

      // Logic: Get relative path -> Split -> Reverse -> Join
      // e.g. "packages/auth/utils" becomes "utils_auth_packages"
      const rel_path = path.relative(root_dir, file.getDirectoryPath());
      const reversed_path = rel_path.replace('../../../', '')
        .split(/[\\/]/) // Split by / or \
        .reverse()
        .map(to_snake_case)
        .join('_');

      const file_snake = to_snake_case(base_name);

      // Builder: function_file_reversedPath
      const create_alias = (name: string) => {
        const func_snake = to_snake_case(name);
        // Filter(Boolean) removes empty strings if file is at root
        return [func_snake, reversed_path].filter(Boolean).join('_');
      };

      const create_alias_class = (name: string) => {
        const func_snake = name;
        if(func_snake == to_pascal_case(reversed_path)){
          return [func_snake].filter(Boolean).join('')
        }
        // Filter(Boolean) removes empty strings if file is at root
        return [func_snake, to_pascal_case(reversed_path)].filter(Boolean).join('');
      };


      // A. Standard Functions
      file.getFunctions()
        .filter(f => f.isExported())
        .forEach(f => {
          const name = f.getName();
          if (name) {
            export_statements.push(`export { ${name} as ${create_alias(name)} } from './${base_name}';`);
          }
        });

      // B. Arrow Functions / Variables
      [
        ...file.getClasses(),
        ...file.getEnums(),
        ...file.getInterfaces(),
        ...file.getTypeAliases()
      ].forEach(v => {
        if (v.isExported()) {
          const name = v.getName()!;
          export_statements.push(`export { ${name} as ${create_alias_class(name)} } from './${base_name}';`);
        }
      });

      // B. Arrow Functions / Variables
      file.getVariableDeclarations().forEach(v => {
        if (v.isExported()) {
          const init = v.getInitializer();
          if (init && (init.isKind(SyntaxKind.ArrowFunction) || init.isKind(SyntaxKind.FunctionExpression))) {
            const name = v.getName();
            export_statements.push(`export { ${name} as ${create_alias(name)} } from './${base_name}';`);
          }
        }
      });
    }

    if (export_statements.length > 0) {
      const index_file_path = `${dir_path}/index.ts`;
      project.createSourceFile(index_file_path, export_statements.join('\n'), {overwrite: true});
      console.log(`[GENERATED] ${index_file_path}`);
      count++;
    }
  }

  if (count > 0) await project.save();
};

generate_reverse_index();