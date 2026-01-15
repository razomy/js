import {get_all_package_jsons} from './get_all_package_jsons';
import fs from 'fs';
import path from 'path';
import {iterate} from 'razomy.fs';

export function add_dependencies() {
  const packages = get_all_package_jsons();

  const packages_dir = '../../../../../';
  const scope = 'razomy'; // Match your scope

// 1. Get list of all available package names
  const import_regex = new RegExp(`from ['"](${scope}[^'"]+)['"]`, 'g');

  packages.forEach(folder => {
    const pkg_json = JSON.parse(fs.readFileSync(folder.path, 'utf8'));
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

      const pkg_source = fs.readFileSync(iterate_node.path, 'utf8');
      // 2. Regex to find imports like: from '@my-org/auth'
      const new_imports = pkg_source.matchAll(import_regex).map(m => m[1].split('/')[0]).toArray()
      matches = [...matches, ...new_imports];
    })

    // 3. Update dependencies
    pkg_json.dependencies = pkg_json.dependencies || {};
    Object.keys(pkg_json.dependencies).filter(i => i.startsWith('razomy')).forEach(i => {
      delete pkg_json.dependencies[i];
    })

    let changed = false;
    matches.forEach(depName => {
      if (depName == 'razomy.' + folder.name.replaceAll('/', '.')) {
        return
      }
      pkg_json.dependencies[depName] = path.join(path.relative(folder.path, packages_dir), folder.name);
      console.log(`[${pkg_json.name}] Added dependency: ${depName}`);
      changed = true;
    });

    if (changed) {
      fs.writeFileSync(folder.path, JSON.stringify(pkg_json, null, 2));
    }
  });
}