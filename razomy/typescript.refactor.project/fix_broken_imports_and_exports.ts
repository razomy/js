import {levenshteinDistance} from '@razomy/string';
import {ExportDeclaration, ImportDeclaration, Project, SourceFile} from 'ts-morph';

/**
 * Index of all exported symbols in the project.
 * Map<SymbolName, SourceFileWhereItIsDefined>
 */
type ExportIndex = Map<string, SourceFile>;

/**
 * Helper to find the best match for a missing symbol.
 * Checks exact match first, then fuzzy match.
 */
function findReplacementSymbol(
  nameToFind: string,
  exportMap: ExportIndex,
  allExportNames: string[]
): { name: string; file: SourceFile } | null {

  // 1. Try Exact Match
  if (exportMap.has(nameToFind)) {
    return {name: nameToFind, file: exportMap.get(nameToFind)!};
  }

  // 2. Try Fuzzy Match
  let lowestDistance = Infinity;
  let currentBestCandidate = '';
  const maxDistanceThreshold = 3; // Strictness of similarity

  for (const candidate of allExportNames) {
    const distance = levenshteinDistance(nameToFind, candidate);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      currentBestCandidate = candidate;
    }
  }

  if (lowestDistance <= maxDistanceThreshold) {
    console.log(`    -> Fuzzy match found: '${nameToFind}' replaced with '${currentBestCandidate}' (Distance: ${lowestDistance})`);
    return {
      name: currentBestCandidate,
      file: exportMap.get(currentBestCandidate)!
    };
  }

  return null;
}

export async function fixBrokenImportsAndExports(projectPath: string) {
  console.log('Initializing project...');
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();

  // ==========================================
  // PHASE 1: INDEX ALL EXPORTS
  // ==========================================
  console.log('Indexing all exported symbols...');
  const exportMap: ExportIndex = new Map();
  const allExportNames: string[] = [];

  for (const file of sourceFiles) {
    const exports = file.getExportedDeclarations();
    for (const [name, _] of exports) {
      if (name !== 'default') {
        exportMap.set(name, file);
        allExportNames.push(name);
      }
    }
  }

  // ==========================================
  // PHASE 2: SCAN & FIX FILES
  // ==========================================
  for (const file of sourceFiles) {

    // --- PART A: FIX IMPORTS ---
    const brokenImports: ImportDeclaration[] = [];
    for (const importDecl of file.getImportDeclarations()) {
      if (importDecl.isModuleSpecifierRelative() && !importDecl.getModuleSpecifierSourceFile()) {
        brokenImports.push(importDecl);
      }
    }

    if (brokenImports.length > 0) {
      console.log(`Fixing IMPORTS in ${file.getBaseName()}...`);

      for (const importDecl of brokenImports) {
        const namedImports = importDecl.getNamedImports();

        for (const named of namedImports) {
          const match = findReplacementSymbol(named.getName(), exportMap, allExportNames);

          if (match) {
            // Check if we already have an import statement for this file
            const existingImport = file.getImportDeclaration(
              i => i.getModuleSpecifierSourceFile() === match.file
            );

            if (existingImport) {
              const alreadyHasName = existingImport.getNamedImports().some(n => n.getName() === match.name);
              if (!alreadyHasName) existingImport.addNamedImport(match.name);
            } else {
              file.addImportDeclaration({
                namedImports: [match.name],
                moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(match.file)
              });
            }
            console.log(`    -> Fixed Import: ${match.name} from ${match.file.getBaseName()}`);
          }
        }
        importDecl.remove();
      }
    }

    // --- PART B: FIX RE-EXPORTS ---
    // Look for: export { Foo } from './broken-path';
    const brokenExports: ExportDeclaration[] = [];
    for (const exportDecl of file.getExportDeclarations()) {
      if (exportDecl.isModuleSpecifierRelative() && !exportDecl.getModuleSpecifierSourceFile()) {
        brokenExports.push(exportDecl);
      }
    }

    if (brokenExports.length > 0) {
      console.log(`Fixing EXPORTS in ${file.getBaseName()}...`);

      for (const exportDecl of brokenExports) {
        const namedExports = exportDecl.getNamedExports();

        // Note: We cannot fix `export * from './broken'` because we don't know what symbols to look for.
        // We only fix named exports.
        for (const named of namedExports) {
          const match = findReplacementSymbol(named.getName(), exportMap, allExportNames);

          if (match) {
            // Check if we already have an export statement for this file
            const existingExport = file.getExportDeclaration(
              e => e.getModuleSpecifierSourceFile() === match.file
            );

            if (existingExport) {
              const alreadyHasName = existingExport.getNamedExports().some(n => n.getName() === match.name);
              if (!alreadyHasName) existingExport.addNamedExport(match.name);
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
        exportDecl.remove();
      }
    }
  }

  await project.save();
  console.log('Done.');
}