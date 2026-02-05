import * as path from 'path';
import {iterate} from '@razomy/fs';
import {isExist} from '@razomy/fs.file';
import {sortBy} from '@razomy/array';

export function getAllPackageJsons(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const packageJsons: { path: string, name: string }[] = [];
  iterate(rootDir, (iterate_node) => {
    if (iterate_node.path.includes('node_modules')) {
      return true;
    }
    if (iterate_node.stats.isFile()) {
      return true;
    }
    const tryPackageJson = path.join(iterate_node.path + '/package.json');
    if (isExist(tryPackageJson)) {
      packageJsons.push({
        path: tryPackageJson,
        name: path.relative(rootDir, tryPackageJson)
          .replace('/package.json', '')
      })
    }
  })
  return sortBy(packageJsons, i => i.name);
}
