import * as fs from 'fs';
import {getAllPackageJsons} from './get_all_package_jsons';
import {sort} from '@razomy/json';

export function updatePackages(projectPath: string, prefix) {
  const packages = getAllPackageJsons(projectPath);
  packages.forEach((folder) => {
      const content = fs.readFileSync(folder.path, 'utf-8');

      let pkgData = {
        // general
        name: folder.name.replaceAll('/', '.').replace(prefix + '.', `@${prefix}/`),
        version: '0.0.0',
        license: 'MIT',
        // scripts
        'scripts': {
          'build': 'tsdown index.ts',
          'dev': 'tsdown index.ts --watch',
          'prepublishOnly': 'npm run build'
        },
        // local
        'main': './index.ts',
        'types': './index.ts',
        'exports': {
          '.': './index.ts',
          './package.json': './package.json',
        },
        // deploy
        'publishConfig': {
          'access': 'public',
          'main': './dist/index.mjs',
          'types': './dist/index.d.mts',
          'exports': {
            '.': {
              'import': './dist/index.mjs',
              'types': './dist/index.d.mts',
            },
            './package.json': './package.json'
          }
        },
        files: ['dist'],
        "repository": {
          "type": "git",
          "url": "git+https://github.com/razomy/js.git",
          "directory": folder.name
        }
      }

      const current = JSON.parse(content);
      pkgData = {
        ...{
          bin: current.bin,
          dependencies: current.dependencies,
          peerDependencies: current.peerDependencies,
          devDependencies: current.devDependencies,
          overrides: current.overrides,
        },
        ...pkgData,
      };
      pkgData = sort(pkgData)
      fs.writeFileSync(folder.path, JSON.stringify(pkgData, null, 2));
      console.log(`✓ Create: ${folder.name} -> ${pkgData.name}`);
    }
  )
  ;
}
