import * as fs from 'fs';
import * as path from 'path';
import * as stringCase from '@razomy/string-case';
import {getAll} from './get_all';
import {getExportedFunctions} from '../../ts-refactor/get_exported_functions';
import {getExportedConstants} from '../../ts-refactor/get_exported_constants';
import {Project} from 'ts-morph';
import {getFilteredSourceFiles} from '../../ts-refactor/get_filtered_source_files';
import * as json from '@razomy/json';

export function updateByTemplate(projectPath: string, prefix) {
  const packages = getAll(projectPath).filter((i) => i.name !== 'razomy/_razomy' && i.name !== 'razomy/nuxt');
  const project = new Project({tsConfigFilePath: projectPath + '/' + 'tsconfig.json'});

  packages.forEach((folder) => {
    const content = fs.readFileSync(folder.path, `utf-8`);
    const currentPackageJson = JSON.parse(content);
    const srcPrefix = (currentPackageJson.files || ['*'])[0] === `*` ? `` : `src/`;
    const sources = getFilteredSourceFiles(project, path.dirname(folder.path));
    const functions = getExportedFunctions(sources);
    const consts = getExportedConstants(sources);
    const rawPkgData = {
      // general
      name: folder.name.replaceAll(`/`, `-`).replace(prefix + `-`, `@${prefix}/`),
      version: currentPackageJson.version || `0.0.1-alpha.4`,
      license: `MIT`,
      type: `module`,
      description: currentPackageJson.description || ``,
      keywords: new Set([
        ...currentPackageJson.name.split(/[@\/\-]/g),
        ...functions.map(i => stringCase.camelCase(i.name)),
        ...consts.map(i => stringCase.camelCase(i.name)),
      ])
        .values()
        .toArray()
        .filter(Boolean),

      homepage: `https://github.com/razomy/js/tree/main/${folder.name}#readme`,
      author: {
        name: `Yevhenii Kamenskyi`,
        email: `yevhenii.kamenskyi+js@razomy.org`,
        url: `https://id.razomy.org/yevhenii-kamenskyi`,
      },
      sideEffects: false,
      // scripts
      scripts: currentPackageJson.scripts || {
        build: 'tsdown index.ts index.browser.ts index.node.ts --format esm,cjs --dts',
        dev: 'tsdown index.ts --watch',
        prepublishOnly: 'npm run build',
      },
      // local
      module: `./${srcPrefix}index.ts`,
      main: `./${srcPrefix}index.ts`,
      types: `./${srcPrefix}index.ts`,
      typesVersions: {
        '*': {
          '.': [`./${srcPrefix}index.ts`],
        },
      },
      exports: {
        '.': {
          vue: {
            types: `./${srcPrefix}index.browser.ts`,
            import: `./${srcPrefix}index.browser.ts`,
            require: `./${srcPrefix}index.browser.ts`,
          },
          edge: {
            types: `./${srcPrefix}index.browser.ts`,
            import: `./${srcPrefix}index.browser.ts`,
            require: `./${srcPrefix}index.browser.ts`,
          },
          import: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
            require: `./${srcPrefix}index.ts`,
          },
          default: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
          },
          require: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
          },
          browser: {
            types: `./${srcPrefix}index.browser.ts`,
            import: `./${srcPrefix}index.browser.ts`,
            require: `./${srcPrefix}index.browser.ts`,
          },
          node: {
            types: `./${srcPrefix}index.node.ts`,
            import: `./${srcPrefix}index.node.ts`,
            require: `./${srcPrefix}index.node.ts`,
          },
        },
        './browser': {
          types: `./${srcPrefix}index.browser.ts`,
          import: `./${srcPrefix}index.browser.ts`,
          require: `./${srcPrefix}index.browser.ts`,
        },
        './node': {
          types: `./${srcPrefix}index.node.ts`,
          import: `./${srcPrefix}index.node.ts`,
          require: `./${srcPrefix}index.node.ts`,
        },
        './specifications.json': './specifications.json',
        './package.json': './package.json',
      },
      // deploy
      publishConfig: {
        access: 'public',
      },
      files: currentPackageJson.files || ['*'],
      repository: {
        type: 'git',
        url: 'git+https://github.com/razomy/js.git',
        directory: folder.name,
      },
      // 6. Engines (хорошая практика)
      engines: {
        node: '>=18',
      },
    };

    let pkgData = {
      ...{
        bin: currentPackageJson.bin,
        dependencies: currentPackageJson.dependencies,
        peerDependencies: currentPackageJson.peerDependencies,
        devDependencies: currentPackageJson.devDependencies,
        overrides: currentPackageJson.overrides,
      },
      ...rawPkgData,
    };
    pkgData = json.sort(pkgData);
    // pkgData.exports = rawPkgData.exports
    // pkgData.publishConfig.exports = rawPkgData.publishConfig.exports;
    fs.writeFileSync(folder.path, JSON.stringify(pkgData, null, 2) + '\n');
    console.log(`✓ Create: ${folder.name} -> ${pkgData.name}`);
  });
}
