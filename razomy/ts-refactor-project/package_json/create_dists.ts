// scripts/build-package.js
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'child_process';

export function createDists(path_) {

  const jsonPath = path.join(path_, './package.json');
// Read root package.json
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Create the production config (remove dev stuff, fix paths)
  const distPkg = {
    ...pkg,
    files: ['*'],
    main: './index.cjs',     // Fallback для старых CJS систем
    module: './index.mjs',   // Для бандлеров
    types: './index.d.mts',
    'exports': {
      '.': {
        'types': {
          'vue': './index.browser.d.mts',
          'browser': './index.browser.d.mts',
          'default': './index.d.mts'
        },
        'vue': './index.browser.mjs',
        'browser': './index.browser.mjs',
        'node': {
          'import': './index.node.mjs',
          'require': './index.node.cjs'
        },
        'import': './index.mjs',
        'require': './index.cjs',
        'default': './index.mjs'
      },
      './browser': './index.browser.mjs',
      './node': './index.node.mjs',
      './package.json': './package.json'
    },
    'scripts': {},
  };
  // todo: add nuxt
  //   "exports": {
  //   ".": {
  //     "import": "./src/module.ts",
  //       "types": "./src/module.ts"
  //   },
  //   "./runtime/locales/*": "./src/runtime/locales/*",
  //     "./runtime/components/*": "./src/runtime/components/*",
  //     "./runtime/functions": "./src/runtime/functions/index.ts",
  //     "./package.json": "./package.json"
  // }
  //   "main": "./dist/module.ts",
  //   "types": "./dist/module.ts",
  //   "name": "@razomy/nuxt",
  //   "type": "module",
  //   "typesVersions": {
  //   "*": {
  //     ".": [
  //       "./dist/module.d.mts"
  //     ]
  //   }
  // },


  execSync('npm run build', {cwd: path.resolve(path_)});
  // Write to dist/package.json
  fs.writeFileSync(path.join(path_, '/dist/package.json'), JSON.stringify(distPkg, null, 2));

  // Copy README and LICENSE
  // fs.copyFileSync('./README.md', './/README.md');
  // fs.copyFileSync('./LICENSE', './/LICENSE');
}

// generate_packge_json('../fs-file-format')
// generate_packge_json('../images')
// generate_packge_json('../videos')
// generate_packge_json('../audios')
