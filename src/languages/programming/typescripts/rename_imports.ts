import { Project, SyntaxKind } from 'ts-morph';

const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
};

const transformPath = (path: string) => {
  // Split path by slashes to handle folders individually
  return path
    .split('/')
    .map(segment => {
      // Don't change relative path indicators
      if (segment === '.' || segment === '..') return segment;
      return toSnakeCase(segment);
    })
    .join('/');
};

const renameImportPaths = async () => {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();
  let count = 0;

  for (const file of sourceFiles) {
    // 1. Get all Import Declarations (import ... from '...')
    const imports = file.getImportDeclarations();

    // 2. Get all Export Declarations (export ... from '...')
    const exports = file.getExportDeclarations();

    const allDeclarations = [...imports, ...exports];

    for (const dec of allDeclarations) {
      const moduleSpecifier = dec.getModuleSpecifierValue();

      // Skip invalid or empty specifiers
      if (!moduleSpecifier) continue;

      // Skip external libraries (node_modules usually don't start with .)
      if (moduleSpecifier.startsWith('.')) continue;

      const newPath = transformPath(moduleSpecifier);

      if (moduleSpecifier !== newPath) {
        dec.setModuleSpecifier(newPath);
        console.log(`[PATH] ${moduleSpecifier} -> ${newPath}`);
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
};

renameImportPaths();