import * as fs from 'fs';
import * as path from 'path';
import {read_file_json} from 'razomy.fs/file/read_file_json';
import {write_file_json} from 'razomy.fs/file/write_file_json';
import {iterate} from 'razomy.fs';
import {is_exist} from 'razomy.fs/file';
import {sort_by} from 'razomy.list';
import {if_main} from 'razomy.main';

export function createPackageJsonAtChildDirs() {
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
  const packages = getAllPackageJsons();
  packages.forEach((folder) => {
    const content = fs.readFileSync(folder.path, 'utf-8');

    let pkg_data = {
      name: prefix + '.' + folder.name.replaceAll('/', '.'),
      version: '0.0.0',
      license: 'MIT',
      main: './index.js',
      types: './index.d.ts',
      publishConfig: {
        access: 'public'
      }
    }

    pkg_data = {...JSON.parse(content), ...pkg_data};

    fs.writeFileSync(folder.path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${pkg_data.name}`);
  });
}

export function getAllPackageJsons() {
  const root_dir: string = path.join(__dirname, '../../../../../');

  const packageJsons: { path: string, name: string }[] = []
  iterate(root_dir, (iterate_node) => {
    if (iterate_node.path.includes('node_modules')) {
      return true;
    }
    if (iterate_node.stats.isFile()) {
      return true;
    }
    const tryPackageJson = path.join(iterate_node.path + '/package.json');
    if (is_exist(tryPackageJson)) {
      packageJsons.push({
        path: tryPackageJson,
        name: path.relative(root_dir, tryPackageJson)
          .replace('/package.json', '')
      })
    }
  })

  return sort_by(packageJsons, i => i.name);
}

export function create_package() {
  const root_dir: string = path.join(__dirname, '../../../../../../');
  const packages = getAllPackageJsons();

  const package_file = read_file_json(root_dir + 'package.json');
  package_file.workspaces = packages.map(folder => 'src/' + folder.name)
  package_file.dependencies = Object.fromEntries(
    []
    // packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), './src/' + folder.name])
  );
  write_file_json(root_dir + 'package.json', package_file, true)

  const ts_file = read_file_json(root_dir + 'tsconfig.json');
  ts_file.compilerOptions.paths = Object.fromEntries(
    packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), ['./src/' + folder.name]])
  );
  ts_file.compilerOptions.paths.razomy = ['./src']
  ts_file.compilerOptions.paths['razomy/*'] = ['./src/*']
  write_file_json(root_dir + 'tsconfig.json', ts_file, true)
}

if_main(import.meta.url, update_packages).then();
if_main(import.meta.url, create_package).then();


