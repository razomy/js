import * as fs from 'fs';
import {getAllPackageJsons} from './get_all_package_jsons';
import {sort} from '@razomy/json';

export function updatePackages(projectPath: string, prefix) {
  const packages = getAllPackageJsons(projectPath);
  packages.forEach((folder) => {
      const content = fs.readFileSync(folder.path, 'utf-8');

      const rawPkgData = {
        // general
        name: folder.name.replaceAll('/', '.').replace(prefix + '.', `@${prefix}/`),
        version: '0.0.0',
        license: 'MIT',
        type: 'module',
        description: '',
        author: {
          'name': 'Yevhenii Kamenskyi',
          'email': 'yevhenii.kamenskyi+js@razomy.org',
          'url': 'https://id.razomy.org/yevhenii.kamenskyi'
        },
        sideEffects: false,
        // scripts
        'scripts': {
          'build': 'tsdown index.ts index.browser.ts index.node.ts --format esm,cjs --dts',
          'dev': 'tsdown index.ts --watch',
          'prepublishOnly': 'npm run build'
        },
        // local
        'main': './index.ts',
        'types': './index.ts',
        'exports': {
          '.': {
            'types': {
              'vue': './index.browser.ts',
              'browser': './index.browser.ts',
              'default': './index.ts'
            },
            'vue': './index.browser.ts',
            'browser': './index.browser.ts',
            'node': './index.node.ts',
            'import': './index.ts',
            'default': './index.ts'
          },
          './browser': './index.browser.ts',
          './node': './index.node.ts',
          './package.json': './package.json',
        },
        // deploy
        'publishConfig': {
          'access': 'public',
          main: './dist/index.cjs',     // Fallback для старых CJS систем
          module: './dist/index.mjs',   // Для бандлеров
          types: './dist/index.d.ts',
          'exports': {
            '.': {
              'types': {
                'vue': './dist/index.browser.d.ts',
                'browser': './dist/index.browser.d.ts',
                'default': './dist/index.d.ts'
              },
              'vue': './dist/index.browser.mjs',
              'browser': './dist/index.browser.mjs',
              'node': {
                'import': './dist/index.node.mjs',
                'require': './dist/index.node.cjs'
              },
              'import': './dist/index.mjs',
              'require': './dist/index.cjs',
              'default': './dist/index.mjs'
            },
            './browser': './index.browser.mjs',
            './node': './index.node.mjs',
            './package.json': './package.json'
          }
        },
        files: ['dist'],
        'repository': {
          'type': 'git',
          'url': 'git+https://github.com/razomy/js.git',
          'directory': folder.name
        },
        // 6. Engines (хорошая практика)
        engines: {
          'node': '>=18'
        }
      }

      const current = JSON.parse(content);
      let pkgData = {
        ...{
          bin: current.bin,
          dependencies: current.dependencies,
          peerDependencies: current.peerDependencies,
          devDependencies: current.devDependencies,
          overrides: current.overrides,
        },
        ...rawPkgData,
      };
      pkgData = sort(pkgData)
      // pkgData.exports = rawPkgData.exports
      // pkgData.publishConfig.exports = rawPkgData.publishConfig.exports;
      fs.writeFileSync(folder.path, JSON.stringify(pkgData, null, 2));
      console.log(`✓ Create: ${folder.name} -> ${pkgData.name}`);
    }
  )
  ;
}
