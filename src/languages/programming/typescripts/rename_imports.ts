import { Project, SyntaxKind } from 'ts-morph';

/**
 * Converts a path segment (file or folder name) to PascalCase
 */
const toPascalCase = (segment: string): string => {
  // Ignore segments like ".." or "."
  if (segment === '.' || segment === '..') return segment;

  // Only convert if it contains underscore or looks like it needs conversion
  // Logic matches the file renamer
  let ff = segment
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  ff = ff.charAt(0).toLowerCase() + ff.slice(1)
  return ff
};

const fixImports = async () => {
  console.log('Scanning for broken snake_case imports...');

  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();
  let changeCount = 0;

  for (const file of sourceFiles) {
    // Get all import declarations (import x from '...')
    // and export declarations (export x from '...')
    const imports = [
      ...file.getImportDeclarations(),
      ...file.getExportDeclarations()
    ];

    for (const imp of imports) {
      if (!imp.getModuleSpecifier()) continue;

      const currentPath = imp.getModuleSpecifierValue()!;

      // 1. Only touch relative imports (starting with . or ..)
      // Ignore libraries like 'lodash' or 'react'
      if (!currentPath.startsWith('.')) continue;

      // 2. Skip if no underscores (unless you want to force PascalCase on everything)
      if (!currentPath.includes('_')) continue;

      // 3. Transform the path
      // Split by '/' to handle folders: ./utils/user_helper -> ./Utils/UserHelper
      const parts = currentPath.split('/');
      const newParts = parts.map(part => toPascalCase(part));
      const newPath = newParts.join('/');

      // 4. Update if different
      if (currentPath !== newPath) {
        imp.setModuleSpecifier(newPath);
        console.log(`[FIX] ${file.getBaseName()}: '${currentPath}' -> '${newPath}'`);
        changeCount++;
      }
    }
  }

  if (changeCount > 0) {
    console.log(`Saving ${changeCount} import path corrections...`);
    await project.save();
  } else {
    console.log('No snake_case relative imports found.');
  }
};

fixImports();