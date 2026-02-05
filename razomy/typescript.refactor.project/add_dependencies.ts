import {getAllPackageJsons} from './get_all_package_jsons';
import fs from 'fs';
import * as path from 'path';
import {iterate} from '@razomy/fs';

export function addDependencies(projectPath: string, prefix) {
  const packages = getAllPackageJsons(projectPath);

  const scope = '@' + prefix
// 1. Get list of all available package names
  const importRegex = new RegExp(`from ['"](${scope}[^'"]+)['"]`, 'g');

  packages.forEach(folder => {
    const pkgJson = JSON.parse(fs.readFileSync(folder.path, 'utf8'));
    let matches: string[] = []
    iterate(path.dirname(folder.path), (iterate_node) => {
      if (iterate_node.path.includes('node_modules')) {
        return true
      }
      if (iterate_node.path.includes('dist')) {
        return true
      }

      if (iterate_node.path.includes('.test.')) {
        return true
      }

      if (iterate_node.path.includes('.spec.')) {
        return true
      }

      if (iterate_node.stats.isDirectory()) {
        return
      }

      const pkgSource = fs.readFileSync(iterate_node.path, 'utf8');
      // 2. Regex to find imports like: from '@my-org/auth'
      const newImports = pkgSource.matchAll(importRegex).map(m => m[1].split('/')[0]).toArray()
      matches = [...matches, ...newImports];
    })

    // 3. Update dependencies
    pkgJson.dependencies = pkgJson.dependencies || {};
    Object.keys(pkgJson.dependencies).filter(i => i.startsWith(prefix)).forEach(i => {
      delete pkgJson.dependencies[i];
    })

    pkgJson.peerDependencies = pkgJson.peerDependencies || {};
    Object.keys(pkgJson.peerDependencies).filter(i => i.startsWith(prefix)).forEach(i => {
      delete pkgJson.peerDependencies[i];
    })
    let changed = false;
    matches.forEach(depName => {
      if (depName == folder.name.replaceAll('/', '.')) {
        return
      }
      pkgJson.peerDependencies[depName] = '*';
      path.join(path.relative(path.join(folder.path, '../../'), projectPath), depName
        .replace(prefix, '')
        .replaceAll('.', '/'));
      console.log(`[${pkgJson.name}] Added dependency: ${depName}`);
      changed = true;
    });

    if (changed) {
      fs.writeFileSync(folder.path, JSON.stringify(pkgJson, null, 2));
    }
  });
}