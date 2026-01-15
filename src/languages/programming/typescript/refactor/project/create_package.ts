import * as fs from 'fs';
import * as path from 'path';
import {read_file_json} from 'razomy.fs/file/read_file_json';
import {write_file_json} from 'razomy.fs/file/write_file_json';
import {iterate} from 'razomy.fs';
import {is_exist} from 'razomy.fs/file';
import {sort_by} from 'razomy.list';
import {if_main} from 'razomy.main';

export function add_dependencies() {
  const packages = get_all_package_jsons();

  const packages_dir = '../../../../../';
  const scope = 'razomy'; // Match your scope

// 1. Get list of all available package names
  const pkg_folders = fs.readdirSync(packages_dir);
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

export function create_package_json_at_child_dirs() {
  const root_dir: string = path.join(__dirname, '../../../../../');
  const prefix: string = 'razomy';

  const folders = fs.readdirSync(root_dir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());

  folders.forEach((folder: fs.Dirent) => {
    const pkg_path = path.join(root_dir, folder.name, 'package.json');
    const new_name = `${prefix}.${folder.name}`;

    let pkg_data = {
      name: new_name,
    };

    const content = fs.readFileSync(pkg_path, 'utf-8');
    pkg_data = {...JSON.parse(content), ...pkg_data};

    fs.writeFileSync(pkg_path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${new_name}`);
  });
}

export function update_packages() {
  const prefix: string = 'razomy';
  const packages = get_all_package_jsons();
  packages.forEach((folder) => {
    const content = fs.readFileSync(folder.path, 'utf-8');

    let pkg_data = {
      name: prefix + '.' + folder.name.replaceAll('/', '.'),
      version: '0.0.0',
      license: 'MIT',
      'main': './index.ts',
      'types': './index.ts',
      publishConfig: {
        access: 'public',
        main: './dist/index.js',
        types: './dist/index.d.ts'
      },
      'scripts': {
        'build': 'tsdown index.ts --format cjs,esm --dts'
      }
    }

    pkg_data = {...JSON.parse(content), ...pkg_data};

    fs.writeFileSync(folder.path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${pkg_data.name}`);
  });
}

export function get_all_package_jsons() {
  const root_dir: string = path.join(__dirname, '../../../../../');

  const package_jsons: { path: string, name: string }[] = []
  iterate(root_dir, (iterate_node) => {
    if (iterate_node.path.includes('node_modules')) {
      return true;
    }
    if (iterate_node.stats.isFile()) {
      return true;
    }
    const try_package_json = path.join(iterate_node.path + '/package.json');
    if (is_exist(try_package_json)) {
      package_jsons.push({
        path: try_package_json,
        name: path.relative(root_dir, try_package_json)
          .replace('/package.json', '')
      })
    }
  })

  return sort_by(package_jsons, i => i.name);
}

export function create_package() {
  const root_dir: string = path.join(__dirname, '../../../../../../');
  const packages = get_all_package_jsons();

  const package_file = read_file_json(root_dir + 'package.json');
  package_file.workspaces = packages.map(folder => 'src/' + folder.name)
  package_file.dependencies = Object.fromEntries(
    packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), './src/' + folder.name])
  );
  write_file_json(root_dir + 'package.json', package_file, true)

  const ts_file = read_file_json(root_dir + 'tsconfig.json');
  // ts_file.compilerOptions.paths = Object.fromEntries(
  //   packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), ['./src/' + folder.name]])
  // );
  // ts_file.compilerOptions.paths.razomy = ['./src']
  // ts_file.compilerOptions.paths['razomy/*'] = ['./src/*']
  write_file_json(root_dir + 'tsconfig.json', ts_file, true)
}

if_main(import.meta.url, add_dependencies).then();
if_main(import.meta.url, update_packages).then();
if_main(import.meta.url, create_package).then();


