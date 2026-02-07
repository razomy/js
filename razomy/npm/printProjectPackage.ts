import fs from 'fs';
import path from 'path';
import {globSync} from 'glob';


// Colors for console output
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const CYAN = '\x1b[36m';

interface Workspace {
  name: string;
  path: string;
  localDeps: string[]; // Only dependencies that exist in this monorepo
}

// 1. MAP WORKSPACES
function getWorkspaceMap(ROOT_DIR): Map<string, Workspace> {
  const map = new Map<string, Workspace>();
  const allPackageNames = new Set<string>();

  // A. Find workspace patterns from root package.json
  const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
  const patterns = Array.isArray(rootPkg.workspaces)
    ? rootPkg.workspaces
    : rootPkg.workspaces?.packages || ['packages/*', 'apps/*'];

  // B. Locate all package.json files
  const files = patterns.flatMap((ptn: string) =>
    globSync(`${ptn}/package.json`, {cwd: ROOT_DIR, ignore: '**/node_modules/**'})
  );

  // C. First pass: Collect all names
  const tempConfigs: { name: string; path: string; allDeps: string[] }[] = [];

  files.forEach(file => {
    const json = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8'));
    allPackageNames.add(json.name);

    tempConfigs.push({
      name: json.name,
      path: path.dirname(file),
      allDeps: [
        ...Object.keys(json.dependencies || {}),
        ...Object.keys(json.devDependencies || {}),
        ...Object.keys(json.peerDependencies || {}) // Optional: include peers if desired
      ]
    });
  });

  // D. Second pass: Filter dependencies to ONLY keep local workspaces
  tempConfigs.forEach(config => {
    map.set(config.name, {
      name: config.name,
      path: config.path,
      // Filter: Keep dep ONLY if it exists in our monorepo
      localDeps: config.allDeps.filter(dep => allPackageNames.has(dep))
    });
  });

  return map;
}

// 2. RECURSIVE PRINT
function printTree(
  pkgName: string,
  map: Map<string, Workspace>,
  prefix: string = '',
  isLast: boolean = true,
  visitedStack: Set<string> = new Set()
) {
  const workspace = map.get(pkgName);
  if (!workspace) return; // Should not happen given our filter

  // Visual Setup
  const marker = isLast ? '└── ' : '├── ';
  const isCircular = visitedStack.has(pkgName);

  // Print current node
  console.log(`${DIM}${prefix}${marker}${RESET}${GREEN}${pkgName}${RESET}${isCircular ? ` ${CYAN}(circular)${RESET}` : ''}`);

  if (isCircular) return; // Stop recursion

  // Prepare for children
  visitedStack.add(pkgName);
  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  const deps = workspace.localDeps;

  // Recurse
  deps.forEach((dep, index) => {
    const isLastChild = index === deps.length - 1;
    printTree(dep, map, childPrefix, isLastChild, new Set(visitedStack));
  });
}

export function printProjectPackage() {

// --- CONFIG ---
  const ROOT_DIR = path.resolve(process.cwd());
// const TARGET_PACKAGE = process.argv[2];
  const TARGET_PACKAGE = '@razomy/images'; // Pass package name as CLI argument

// 3. EXECUTION
  if (!TARGET_PACKAGE) {
    console.log('Usage: npx ts-node scripts/tree-deps.ts <package-name>');
    process.exit(1);
  }

  const workspaces = getWorkspaceMap(ROOT_DIR);

  if (!workspaces.has(TARGET_PACKAGE)) {
    console.error(`❌ Package "${TARGET_PACKAGE}" not found in workspaces.`);
    process.exit(1);
  }

  console.log(`\n📦 Dependency Tree for: ${CYAN}${TARGET_PACKAGE}${RESET}\n`);
// Start recursion
// We create a "root" call manually to format the top level nicely
  printTree(TARGET_PACKAGE, workspaces, '', true);
  console.log('');

}

printProjectPackage();