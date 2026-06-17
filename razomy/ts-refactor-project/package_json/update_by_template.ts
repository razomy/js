import * as fs from 'fs';
import * as path from 'path';
import * as stringCase from '@razomy/string-case';
import { Project } from 'ts-morph';
import * as json from '@razomy/json';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';

function getDirectoriesRecursive(dir: string, dirList: string[] = []): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  dirList.push(dir); // Добавляем текущую папку в массив

  for (const file of files) {
    if (file.isDirectory() && !['dist', 'node_modules', '.git'].includes(file.name)) {
      getDirectoriesRecursive(path.join(dir, file.name), dirList);
    }
  }

  return dirList;
}

function generatePackageExportsAndBuild(folderPath: string, srcPrefix: string) {
  const allDirs = getDirectoriesRecursive(folderPath);

  const generatedExports: Record<string, any> = {};
  const buildFiles: string[] = [];
  const devFiles: string[] = [];

  for (const dir of allDirs) {
    // Получаем относительный путь (например 'utils' или '' для корня)
    const relativePath = path.relative(folderPath, dir).replace(/\\/g, '/');
    const isRoot = relativePath === '';
    const exportKey = isRoot ? '.' : `./${relativePath}`;
    const prefixPath = isRoot ? `./${srcPrefix}` : `./${srcPrefix}${relativePath}/`;

    // 2. Отфильтровываем, где какой тип
    const hasIndex = fs.existsSync(path.join(dir, 'index.ts'));
    const hasBrowser = fs.existsSync(path.join(dir, 'index.browser.ts'));
    const hasNode = fs.existsSync(path.join(dir, 'index.node.ts'));
    const hasRemote = fs.existsSync(path.join(dir, 'index.remote.ts'));

    // Пропускаем папки, в которых нет нужных файлов
    if (!hasIndex && !hasBrowser && !hasNode && !hasRemote) continue;

    // 3. Записываем их как экспорт
    const currentExport: any = {};
    function makeCond (ext: string) { return ({
            types: `${prefixPath}index${ext}.ts`,
            import: `${prefixPath}index${ext}.ts`,
            require: `${prefixPath}index${ext}.ts`,
          }); }

    if (hasBrowser) {
      currentExport.vue = makeCond('.browser');
      currentExport.edge = makeCond('.browser');
      currentExport.browser = makeCond('.browser');
    }

    if (hasIndex) {
      currentExport.import = { types: `${prefixPath}index.ts`, default: `${prefixPath}index.ts` };
      currentExport.default = { types: `${prefixPath}index.ts`, default: `${prefixPath}index.ts` };
      currentExport.require = { types: `${prefixPath}index.ts`, default: `${prefixPath}index.ts` };
    }

    if (hasNode) {
      currentExport.node = makeCond('.node');
    }

    // Сохраняем главный экспорт для папки ('.' или './subfolder')
    generatedExports[exportKey] = currentExport;

    // Сохраняем именованные экспорты ('./browser' или './subfolder/browser')
    if (hasBrowser) generatedExports[isRoot ? './browser' : `${exportKey}/browser`] = makeCond('.browser');
    if (hasNode) generatedExports[isRoot ? './node' : `${exportKey}/node`] = makeCond('.node');
    if (hasRemote) generatedExports[isRoot ? './remote' : `${exportKey}/remote`] = makeCond('.remote');

    // 4. Собираем массив файлов для команды билда
    const buildPrefix = isRoot ? '' : `${relativePath}/`;
    if (hasIndex) {
      buildFiles.push(`${buildPrefix}index.ts`);
      devFiles.push(`${buildPrefix}index.ts`); // В dev крутим только основные файлы
    }
    if (hasBrowser) buildFiles.push(`${buildPrefix}index.browser.ts`);
    if (hasNode) buildFiles.push(`${buildPrefix}index.node.ts`);
    if (hasRemote) buildFiles.push(`${buildPrefix}index.remote.ts`);
  }

  // Обновляем билд команды
  return {
    exports: generatedExports,
    buildCmd: `tsdown ${buildFiles.join(' ')} --format esm,cjs --dts`,
    devCmd: `tsdown ${devFiles.join(' ')} --watch`,
  };
}

export function updateByTemplate(projectPath: string, prefix: string) {
  const packages = tsRefactorProject.packageJson
    .getAll(projectPath)
    .filter((i) => !tsRefactorProject.packageJson.isPackageNameSkip(i.name));
  const project = new Project({ tsConfigFilePath: projectPath + '/' + 'tsconfig.json' });

  packages.forEach((folder) => {
    const folderPath = path.dirname(folder.path);
    const content = fs.readFileSync(folder.path, `utf-8`);
    const currentPackageJson = JSON.parse(content);
    const srcPrefix = (currentPackageJson.files || ['*'])[0] === `*` ? `` : `src/`;

    const sources = tsRefactor.getFilteredSourceFiles(project, folderPath);
    const functions = tsRefactor.getExportedFunctions(sources);
    const consts = tsRefactor.getExportedConstants(sources);

    // ВЫЗОВ НОВОЙ ФУНКЦИИ
    const dynamicData = generatePackageExportsAndBuild(folderPath, srcPrefix);

    const defaultBuild = {
      build: dynamicData.buildCmd,
      dev: dynamicData.devCmd,
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
        // Распаковываем динамически сгенерированные экспорты
        ...dynamicData.exports,
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
      // Engines
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

