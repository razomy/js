import {Project, SyntaxKind} from 'ts-morph';
import * as path from 'path';

const toSnakeCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const toPascalCase = (str: string) => {
  let ff = str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  return ff
};

const generateReverseIndex = async () => {
  const project = new Project({tsConfigFilePath: '../../../../tsconfig.json'});

  // Get project root absolute path to calculate relative paths later
  const rootDir = project.getDirectory('../../../../src')?.getPath() || process.cwd();

  const directories = project.getDirectories();
  let count = 0;

  for (const dir of directories) {
    const dirPath = dir.getPath();
    const exportStatements: string[] = [];

    // 1. Export Sub-Directories (Recursion)
    for (const subDir of dir.getDirectories()) {
      exportStatements.push(`export * from './${subDir.getBaseName()}';`);
    }

    // 2. Process Files
    for (const file of dir.getSourceFiles()) {
      const baseName = file.getBaseNameWithoutExtension();
      if (baseName === 'index') continue;

      // Logic: Get relative path -> Split -> Reverse -> Join
      // e.g. "packages/auth/utils" becomes "utils_auth_packages"
      const relPath = path.relative(rootDir, file.getDirectoryPath());
      const reversedPath = relPath.replace('../../../', '')
        .split(/[\\/]/) // Split by / or \
        .reverse()
        .map(toSnakeCase)
        .join('_');

      const fileSnake = toSnakeCase(baseName);

      // Builder: function_file_reversedPath
      const createAlias = (name: string) => {
        const funcSnake = toSnakeCase(name);
        // Filter(Boolean) removes empty strings if file is at root
        return [funcSnake, reversedPath].filter(Boolean).join('_');
      };

      const createAliasClass = (name: string) => {
        const funcSnake = name;
        if(funcSnake == toPascalCase(reversedPath)){
          return [funcSnake].filter(Boolean).join('')
        }
        // Filter(Boolean) removes empty strings if file is at root
        return [funcSnake, toPascalCase(reversedPath)].filter(Boolean).join('');
      };


      // A. Standard Functions
      file.getFunctions()
        .filter(f => f.isExported())
        .forEach(f => {
          const name = f.getName();
          if (name) {
            exportStatements.push(`export { ${name} as ${createAlias(name)} } from './${baseName}';`);
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
          exportStatements.push(`export { ${name} as ${createAliasClass(name)} } from './${baseName}';`);
        }
      });

      // B. Arrow Functions / Variables
      file.getVariableDeclarations().forEach(v => {
        if (v.isExported()) {
          const init = v.getInitializer();
          if (init && (init.isKind(SyntaxKind.ArrowFunction) || init.isKind(SyntaxKind.FunctionExpression))) {
            const name = v.getName();
            exportStatements.push(`export { ${name} as ${createAlias(name)} } from './${baseName}';`);
          }
        }
      });
    }

    if (exportStatements.length > 0) {
      const indexFilePath = `${dirPath}/index.ts`;
      project.createSourceFile(indexFilePath, exportStatements.join('\n'), {overwrite: true});
      console.log(`[GENERATED] ${indexFilePath}`);
      count++;
    }
  }

  if (count > 0) await project.save();
};

generateReverseIndex();