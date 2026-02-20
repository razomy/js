import * as fs from 'fs';
import {getAll} from './get_all';
import {sort} from '@razomy/json';

export function updateByTemplate(projectPath: string, prefix) {
  const packages = getAll(projectPath);
  packages.forEach((folder) => {
      const content = fs.readFileSync(folder.path, 'utf-8');

      const rawPkgData = {
        // general
        name: folder.name.replaceAll('/', '-').replace(prefix + '-', `@${prefix}/`),
        version: '0.0.1-alpha.3',
        license: 'MIT',
        type: 'module',
        description: '',
        author: {
          'name': 'Yevhenii Kamenskyi',
          'email': 'yevhenii.kamenskyi+js@razomy.org',
          'url': 'https://id.razomy.org/yevhenii-kamenskyi'
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
          'access': 'public'
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
