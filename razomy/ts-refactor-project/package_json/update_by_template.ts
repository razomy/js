import * as fs from 'fs';
import * as path from 'path';
import * as fss from '@razomy/fss';
import * as stringCase from '@razomy/string-case';
import { Project } from 'ts-morph';
import * as json from '@razomy/json';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';

export function updateByTemplate(projectPath: string, prefix) {
  const packages = tsRefactorProject.packageJson
    .getAll(projectPath)
    .filter((i) => !tsRefactorProject.packageJson.isPackageNameSkip(i.name));
  const project = new Project({ tsConfigFilePath: projectPath + '/' + 'tsconfig.json' });

  packages.forEach((folder) => {
    const folderPath = path.dirname(folder.path);
    const content = fs.readFileSync(folder.path, `utf-8`);
    const currentPackageJson = JSON.parse(content);
    const srcPrefix = (currentPackageJson.files || ['*'])[0] === `*` ? `` : `src/`;
    const sources = tsRefactor.getFilteredSourceFiles(project, path.dirname(folder.path));
    const functions = tsRefactor.getExportedFunctions(sources);
    const consts = tsRefactor.getExportedConstants(sources);

    const dotBrowserExports = {
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
      browser: {
        types: `./${srcPrefix}index.browser.ts`,
        import: `./${srcPrefix}index.browser.ts`,
        require: `./${srcPrefix}index.browser.ts`,
      },
    };
    const nameBrowserExport = {
      './browser': {
        types: `./${srcPrefix}index.browser.ts`,
        import: `./${srcPrefix}index.browser.ts`,
        require: `./${srcPrefix}index.browser.ts`,
      },
    };

    const dotNodeExports = {
      node: {
        types: `./${srcPrefix}index.node.ts`,
        import: `./${srcPrefix}index.node.ts`,
        require: `./${srcPrefix}index.node.ts`,
      },
    };
    const nameNodeExport = {
      './node': {
        types: `./${srcPrefix}index.node.ts`,
        import: `./${srcPrefix}index.node.ts`,
        require: `./${srcPrefix}index.node.ts`,
      },
    };

    const isBrowserExports = fss.file.isExist(`${folderPath}/index.browser.ts`);
    const isNodeExports = fss.file.isExist(`${folderPath}/index.node.ts`);

    const defaultBuild = {
      build: `tsdown index.ts ${isBrowserExports ? 'index.browser.ts ' : ''}${
        isNodeExports ? 'index.node.ts ' : ''
      }--format esm,cjs --dts`,
      dev: 'tsdown index.ts --watch',
      prepublishOnly: 'npm run build',
    };

    const rawPkgData = {
      // general
      name: folder.name.replaceAll(`/`, `-`).replace(prefix + `-`, `@${prefix}/`),
      version: currentPackageJson.version || `0.0.1-alpha.4`,
      license: `MIT`,
      type: `module`,
      description: currentPackageJson.description || ``,
      keywords: new Set([
        ...currentPackageJson.name.split(/[@\/\-]/g),
        ...functions.map((i) => stringCase.camelCase(i.name)),
        ...consts.map((i) => stringCase.camelCase(i.name)),
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
      scripts: defaultBuild,
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
          ...(isBrowserExports ? dotBrowserExports : {}),
          import: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
          },
          default: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
          },
          require: {
            types: `./${srcPrefix}index.ts`,
            default: `./${srcPrefix}index.ts`,
          },
          ...(isNodeExports ? dotNodeExports : {}),
        },
        ...(isBrowserExports ? nameBrowserExport : {}),
        ...(isNodeExports ? nameNodeExport : {}),
        './specifications/*': './specifications/*',
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
