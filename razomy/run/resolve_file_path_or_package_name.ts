import {dirname, resolve} from "node:path";
import {pathToFileURL} from "node:url";

export function resolveFilePathOrPackageName(workspaceDir: string, filePathOrPackageName: string): {
  importPath: string;
  moduleDir: string;
  isFile: boolean
} {
  let importPath = filePathOrPackageName;
  let moduleDir = '';
  let isFile = false;

  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    const absolutePath = resolve(workspaceDir, importPath);
    importPath = pathToFileURL(absolutePath).href;
    moduleDir = dirname(absolutePath);
    isFile = true;
  } else {
    try {
      const packageJsonPath = require.resolve(`${filePathOrPackageName}/package.json`, {paths: [workspaceDir]});
      moduleDir = dirname(packageJsonPath);
    } catch {
      moduleDir = resolve(workspaceDir, 'node_modules', filePathOrPackageName);
    }
  }

  return {importPath, moduleDir, isFile};
}
