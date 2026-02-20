import {getAll} from './get_all';
import fs from 'fs';
import * as path from 'path';
import {iterate} from '@razomy/fs';
import {sort} from '@razomy/json';

export function addDependencies(projectPath: string, prefix) {
  const packages = getAll(projectPath);

  const scope = '@' + prefix
// 1. Get list of all available package names
  const importRegex = new RegExp(`from ['"](\\@${prefix}[^'"]+)['"]`, 'g');

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
        return undefined;
      }

      const pkgSource = fs.readFileSync(iterate_node.path, 'utf8');
      // 2. Regex to find imports like: from '@my-org/auth'
      const newImports = pkgSource.matchAll(importRegex).map(m => m[1]).toArray()
      matches = [...matches, ...newImports];
      return undefined;
    })

    // 3. Update dependencies
    pkgJson.dependencies = pkgJson.dependencies || {};
    Object.keys(pkgJson.dependencies).filter(i => i.startsWith(scope)).forEach(i => {
      delete pkgJson.dependencies[i];
    })

    pkgJson.peerDependencies = pkgJson.peerDependencies || {};
    Object.keys(pkgJson.peerDependencies).filter(i => i.startsWith(scope)).forEach(i => {
      delete pkgJson.peerDependencies[i];
    })
    matches.forEach(depName => {
      if (depName === folder.name.replaceAll('/', '-').replace(prefix + '-', scope + '/')) {
        return
      }
      pkgJson.peerDependencies[depName] = '0.0.1-alpha.3';
      // path.join(path.relative(path.join(folder.path, '../../'), projectPath), depName
      //   .replace(prefix, '')
      //   .replaceAll('.', '/'));
      console.log(`[${pkgJson.name}] Added dependency: ${depName}`);
    });
    pkgJson.peerDependencies = sort(pkgJson.peerDependencies);

    fs.writeFileSync(folder.path, JSON.stringify(pkgJson, null, 2));
  });
}