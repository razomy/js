import * as path from 'path';
import * as fs from '@razomy/fs';
import * as fsFile from '@razomy/fs-file';
import * as array from '@razomy/array';

export function getAll(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const packageJsons: { path: string; name: string }[] = [];
  fs.iterate(rootDir, (iterate_node) => {
    if (iterate_node.path.includes('node_modules') || iterate_node.path.includes('dist')) {
      return true;
    }
    if (iterate_node.stats.isFile()) {
      return true;
    }
    const tryPackageJson = path.join(iterate_node.path + '/package.json');
    if (fsFile.isExist(tryPackageJson)) {
      packageJsons.push({
        path: tryPackageJson,
        name: path.relative(rootDir, tryPackageJson).replace('/package.json', ''),
      });
    }
    return undefined;
  });
  return array.sortBy(packageJsons, (i) => i.name);
}
