import * as path from 'path';
import * as fs from 'fs';
import {Project, SourceFile} from 'ts-morph';
import {levenshteinDistance} from '@razomy/string';

function getNewFilePath(rootDir: string, sourceFile: SourceFile): string | null {
  const filePath = sourceFile.getFilePath();

  // Get path relative to root: "users/auth/login.ts"
  const relativePath = path.relative(rootDir, filePath);

  const directoryName = path.dirname(relativePath); // "users/auth"
  const fileName = path.basename(relativePath);     // "login.ts"

  // If the file is already at the root or just one level deep,
  // and doesn't contain separators, we might not need to move it.
  // However, if directoryName is ".", it's at root.
  if (directoryName === '.') return null;

  // Split the directory path: ['users', 'auth']
  const parts = directoryName.split(path.sep);

  // If it's already a single folder level (e.g. "users"), no need to change
  // unless you want to enforce dot notation even for single levels (usually not needed).
  // If it has only 1 part, it implies "src/users/file.ts", which is already flat.
  if (parts.length === 1) {
    return null;
  }

  // Join with dots: "users.auth"
  const newPackageDirName = parts.join('.');

  // Construct new full path: /abs/path/to/src + "users.auth" + "login.ts"
  return path.join(rootDir, newPackageDirName, fileName);
}

async function flattenFolders(project: Project, rootDir: string) {
  console.log('--- Phase 1: Flattening Folders to "Package.Name" style ---');

  const sourceFiles = project.getSourceFiles();
  const directoriesToDelete = new Set<string>();

  for (const file of sourceFiles) {
    const oldPath = file.getFilePath();

    // Ensure we only touch files inside the target dir
    if (!oldPath.startsWith(rootDir)) continue;

    const newPath = getNewFilePath(rootDir, file);

    // If null or same, skip
    if (!newPath || newPath === oldPath) continue;

    console.log(`Moving: \n   FROM: ${path.relative(rootDir, oldPath)} \n     TO: ${path.relative(rootDir, newPath)}`);

    // This updates relative imports in this file AND imports to this file in other files
    file.move(newPath);

    directoriesToDelete.add(path.dirname(oldPath));
  }

  await project.save();

  console.log('Cleaning up empty directories...');
  // Sort by length desc to delete deepest folders first
  const sortedDirs = Array.from(directoriesToDelete).sort((a, b) => b.length - a.length);

  for (const dir of sortedDirs) {
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
      }
    } catch (e) {
      // Folder might not be empty or already deleted
    }
  }
}

// ==========================================
// PART 2: IMPORT FIXER (Safety Net)
// ==========================================

type ExportIndex = Map<string, SourceFile>;

function findReplacementSymbol(
  nameToFind: string,
  exportMap: ExportIndex,
  allExportNames: string[]
): { name: string; file: SourceFile } | null {

  if (exportMap.has(nameToFind)) {
    return {name: nameToFind, file: exportMap.get(nameToFind)!};
  }

  let lowestDistance = Infinity;
  let currentBestCandidate = '';
  const maxDistanceThreshold = 3;

  for (const candidate of allExportNames) {
    const distance = levenshteinDistance(nameToFind, candidate);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      currentBestCandidate = candidate;
    }
  }

  if (lowestDistance <= maxDistanceThreshold) {
    console.log(`    -> Fuzzy match: '${nameToFind}' replaced with '${currentBestCandidate}'`);
    return {
      name: currentBestCandidate,
      file: exportMap.get(currentBestCandidate)!
    };
  }
  return null;
}

async function fixBrokenImportsAndExports(project: Project) {
  console.log('\n--- Phase 2: Verifying & Fixing Imports ---');

  const sourceFiles = project.getSourceFiles();

  // Index exports
  const exportMap: ExportIndex = new Map();
  const allExportNames: string[] = [];

  for (const file of sourceFiles) {
    for (const [name, _] of file.getExportedDeclarations()) {
      if (name !== 'default') {
        exportMap.set(name, file);
        allExportNames.push(name);
      }
    }
  }

  for (const file of sourceFiles) {
    // Fix Imports
    const brokenImports = file.getImportDeclarations()
      .filter(i => i.isModuleSpecifierRelative() && !i.getModuleSpecifierSourceFile());

    if (brokenImports.length > 0) {
      console.log(`Fixing IMPORTS in ${file.getBaseName()}...`);
      for (const importDecl of brokenImports) {
        for (const named of importDecl.getNamedImports()) {
          const match = findReplacementSymbol(named.getName(), exportMap, allExportNames);
          if (match) {
            const existing = file.getImportDeclaration(i => i.getModuleSpecifierSourceFile() === match.file);
            if (existing) {
              if (!existing.getNamedImports().some(n => n.getName() === match.name)) {
                existing.addNamedImport(match.name);
              }
            } else {
              file.addImportDeclaration({
                namedImports: [match.name],
                moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(match.file)
              });
            }
          }
        }
        importDecl.remove();
      }
    }

    // Fix Exports (re-exports)
    const brokenExports = file.getExportDeclarations()
      .filter(e => e.isModuleSpecifierRelative() && !e.getModuleSpecifierSourceFile());

    if (brokenExports.length > 0) {
      console.log(`Fixing EXPORTS in ${file.getBaseName()}...`);
      for (const exportDecl of brokenExports) {
        for (const named of exportDecl.getNamedExports()) {
          const match = findReplacementSymbol(named.getName(), exportMap, allExportNames);
          if (match) {
            // ... logic to re-add export ...
            file.addExportDeclaration({
              namedExports: [match.name],
              moduleSpecifier: file.getRelativePathAsModuleSpecifierTo(match.file)
            });
          }
        }
        exportDecl.remove();
      }
    }
  }

  await project.save();
}

// ==========================================
// MAIN
// ==========================================

export async function flattenPackages(tsConfigPath: string, targetDir: string) {
  console.log('Initializing...');
  const project = new Project({tsConfigFilePath: tsConfigPath + 'tsconfig.json'});
  const rootAbsPath = path.resolve(tsConfigPath, targetDir);

  // 1. Rename Folders to Package.Style
  await flattenFolders(project, rootAbsPath);

  // 2. Fix anything that broke
  await fixBrokenImportsAndExports(project);

  console.log('Done.');
}

// ifMain(import.meta.url || module.path, () => flattenPackages('../../', 'razomy')).then()
