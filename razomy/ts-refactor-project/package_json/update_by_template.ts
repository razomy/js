import * as fs from 'fs';
import {getAll} from './get_all';
import {sort} from '@razomy/json';

export function updateByTemplate(projectPath: string, prefix) {
  const packages = getAll(projectPath);
  packages.forEach((folder) => {
      const content = fs.readFileSync(folder.path, `utf-8`);
      const current = JSON.parse(content);
      const srcPrefix = current.files[0] === `*` ? `` : `src/`;
      const rawPkgData = {
        // general
        name: folder.name.replaceAll(`/`, `-`).replace(prefix + `-`, `@${prefix}/`),
        version: `0.0.1-alpha.4`,
        license: `MIT`,
        type: `module`,
        description: ``,
        author: {
          name: `Yevhenii Kamenskyi`,
          email: `yevhenii.kamenskyi+js@razomy.org`,
          url: `https://id.razomy.org/yevhenii-kamenskyi`
        },
        sideEffects: false,
        // scripts
        'scripts': current.scripts || {
          'build': 'tsdown index.ts index.browser.ts index.node.ts --format esm,cjs --dts',
          'dev': 'tsdown index.ts --watch',
          'prepublishOnly': 'npm run build'
        },
        // local
        'module': `./${srcPrefix}index.ts`,
        'main': `./${srcPrefix}index.ts`,
        'types': `./${srcPrefix}index.ts`,
        'typesVersions': {
          '*': {
            '.': [
              `./${srcPrefix}index.ts`
            ]
          }
        },
        'exports': {
          '.': {
            'vue': {
              'types': `./${srcPrefix}index.browser.ts`,
              'import': `./${srcPrefix}index.browser.ts`,
              'require': `./${srcPrefix}index.browser.ts`
            },
            'edge': {
              'types': `./${srcPrefix}index.browser.ts`,
              'import': `./${srcPrefix}index.browser.ts`,
              'require': `./${srcPrefix}index.browser.ts`
            },
            'import': {
              'types': `./${srcPrefix}index.ts`,
              'default': `./${srcPrefix}index.ts`,
              'require': `./${srcPrefix}index.ts`
            },
            'default': {
              'types': `./${srcPrefix}index.ts`,
              'default': `./${srcPrefix}index.ts`
            },
            'require': {
              'types': `./${srcPrefix}index.ts`,
              'default': `./${srcPrefix}index.ts`
            },
            'browser': {
              'types': `./${srcPrefix}index.browser.ts`,
              'import': `./${srcPrefix}index.browser.ts`,
              'require': `./${srcPrefix}index.browser.ts`
            },
            'node': {
              'types': `./${srcPrefix}index.node.ts`,
              'import': `./${srcPrefix}index.node.ts`,
              'require': `./${srcPrefix}index.node.ts`
            },
          },
          './browser': {
            'types': `./${srcPrefix}index.browser.ts`,
            'import': `./${srcPrefix}index.browser.ts`,
            'require': `./${srcPrefix}index.browser.ts`
          },
          './node': {
            'types': `./${srcPrefix}index.node.ts`,
            'import': `./${srcPrefix}index.node.ts`,
            'require': `./${srcPrefix}index.node.ts`
          },
          './package.json': './package.json'
        },
        // deploy
        'publishConfig': {
          'access': 'public'
        },
        files: current.files || ['*'],
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
