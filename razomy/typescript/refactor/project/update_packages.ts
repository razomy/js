import * as fs from 'fs';
import {getAllPackageJsons} from './get_all_package_jsons';

export function updatePackages(projectPath: string) {
  const packages = getAllPackageJsons(projectPath);
  packages.forEach((folder) => {
    const content = fs.readFileSync(folder.path, 'utf-8');

    let pkgData = {
      name: folder.name.replaceAll('/', '.'),
      version: '0.0.0',
      license: 'MIT',
      'main': './index.ts',
      'types': './index.ts',
      publishConfig: {
        access: 'public',
        main: './dist/index.mjs',
        types: './dist/index.d.mts'
      },
      'scripts': {
        'build': 'tsdown index.ts'
      }
    }

    pkgData = {...JSON.parse(content), ...pkgData};

    fs.writeFileSync(folder.path, JSON.stringify(pkgData, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${pkgData.name}`);
  });
}
