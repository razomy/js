import * as fs from 'fs';
import {get_all_package_jsons} from './get_all_package_jsons';

export function update_packages(project_path: string) {
  const prefix: string = 'razomy';
  const packages = get_all_package_jsons(project_path);
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
