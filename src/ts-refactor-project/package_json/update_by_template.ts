import * as fs from 'fs';
import * as path from 'path';
import * as stringCase from '@razomy/string-case';
import { Project } from 'ts-morph';
import * as json from '@razomy/json';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';

/**
 * Склеивает пути через '/' и добавляет './' только в финальный результат.
 * Если путь пустой или равен '.', возвращает '.'
 */
function toDotPath(...segments: string[]): string {
  const joined = path.posix.join(...segments.filter(Boolean));
  if (joined === '.' || joined === '') return '.';
  return `./${joined}`;
}

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
  const buildFiles = {
    browser: [] as string[],
    node: [] as string[],
    default: [] as string[],
    remote: [] as string[],
    extensions: [] as string[],
  };
  const devFiles: string[] = [];

  for (const dir of allDirs) {
    // Получаем относительный путь и приводим слэши к формату POSIX (на случай Windows)
    const relativePath = path.relative(folderPath, dir).split(path.sep).join(path.posix.sep);

    // Чистый путь с учетом srcPrefix (без './' в начале)
    const prefixPath = path.posix.join(srcPrefix, relativePath);

    // 2. Отфильтровываем, где какой тип
    const hasIndex = fs.existsSync(path.join(dir, 'index.ts'));
    const hasBrowser = fs.existsSync(path.join(dir, 'index.browser.ts'));
    const hasNode = fs.existsSync(path.join(dir, 'index.node.ts'));
    const hasRemote = fs.existsSync(path.join(dir, 'index.remote.ts'));
    const hasExtensions = fs.existsSync(path.join(dir, 'extensions.ts'));

    // Пропускаем папки, в которых нет нужных файлов
    if (!hasIndex && !hasBrowser && !hasNode && !hasRemote && !hasExtensions) continue;

    // 3. Записываем их как экспорт
    const currentExport: any = {};
    function makeCond(ext: string, idxText = 'index.') {
      const targetFile = toDotPath(prefixPath, `${idxText}${ext}.ts`);
      return {
        types: targetFile,
        import: targetFile,
        require: targetFile,
      };
    }

    if (hasBrowser) {
      currentExport.vue = makeCond('browser');
      currentExport.edge = makeCond('browser');
      currentExport.browser = makeCond('browser');
    }

    if (hasIndex) {
      const indexFile = toDotPath(prefixPath, 'index.ts');
      currentExport.import = { types: indexFile, default: indexFile };
      currentExport.default = { types: indexFile, default: indexFile };
      currentExport.require = { types: indexFile, default: indexFile };
    }

    if (hasNode) {
      currentExport.node = makeCond('node');
    }

    // Сохраняем главный экспорт для папки ('.' или './subfolder')
    const exportKey = toDotPath(relativePath);
    if (Object.keys(currentExport).length > 0) {
      generatedExports[exportKey] = currentExport;
    }

    // Сохраняем именованные экспорты ('./browser' или './subfolder/browser')
    if (hasBrowser) {
      generatedExports[toDotPath(relativePath, 'browser')] = makeCond('browser');
    }
    if (hasNode) {
      generatedExports[toDotPath(relativePath, 'node')] = makeCond('node');
    }
    if (hasRemote) {
      generatedExports[toDotPath(relativePath, 'remote')] = makeCond('remote');
    }
    if (hasExtensions) {
      generatedExports[toDotPath(relativePath, 'extensions')] = makeCond('extensions', '');
    }

    // 4. Собираем массив файлов для команды билда (без './', чистый posix.join)
    if (hasIndex) {
      const idxBuildPath = path.posix.join(relativePath, 'index.ts');
      buildFiles.default.push(idxBuildPath);
      devFiles.push(idxBuildPath); // В dev крутим только основные файлы
    }
    if (hasBrowser) buildFiles.browser.push(path.posix.join(relativePath, 'index.browser.ts'));
    if (hasNode) buildFiles.node.push(path.posix.join(relativePath, 'index.node.ts'));
    if (hasRemote) buildFiles.remote.push(path.posix.join(relativePath, 'index.remote.ts'));
    if (hasExtensions) buildFiles.extensions.push(path.posix.join(relativePath, 'extensions.ts'));
  }

  type NpmCommandName = string;

  const buildPlatformMap: Record<keyof typeof buildFiles, NpmCommandName> = {
    browser: 'browser',
    node: 'node',
    default: 'neutral',
    extensions: 'neutral',
    remote: 'neutral',
  };

  const activeBuild = Object.entries(buildFiles).filter(([, entry]) => entry.length > 0);

  const buildCmd = {
    build: `tsdown`,
  };
  const otherCmd = {
    tsdown: activeBuild.map(([key, e]) => ({
      entry: e,
      platform: buildPlatformMap[key as keyof typeof buildFiles],
      format: 'esm,cjs',
      dts: true,
    })),
  };

  // Обновляем билд команды
  return {
    exports: generatedExports,
    buildCmd,
    devCmd: {
      dev: `tsdown ${devFiles.join(' ')} --watch`,
    },
    otherCmd,
  };
}

export function updateByTemplate(projectPath: string, sourcePath: string, scopeName: string) {
  const packages = tsRefactorProject.packageJson
    .getAll(projectPath)
    .filter((i) => !tsRefactor.isPackageNameSkipGeneratingPackageJsonAndReadme(i.name.replace(sourcePath, scopeName)));
  const project = new Project({ tsConfigFilePath: path.join(projectPath, 'tsconfig.json') });

  packages.forEach((folder) => {
    const folderPath = path.dirname(folder.path);
    const content = fs.readFileSync(folder.path, `utf-8`);
    const currentPackageJson = JSON.parse(content);
    const srcPrefix = (currentPackageJson.files || ['*'])[0] === `*` ? `` : `src`;

    const sources = tsRefactor.getFilteredSourceFiles(project, folderPath);
    const functions = tsRefactor.getExportedFunctions(sources);
    const consts = tsRefactor.getExportedConstants(sources);

    // ВЫЗОВ НОВОЙ ФУНКЦИИ
    const dynamicData = generatePackageExportsAndBuild(folderPath, srcPrefix);

    const defaultBuild = {
      ...dynamicData.buildCmd,
      ...dynamicData.devCmd,
      prepublishOnly: 'npm run build',
    };

    // Финальный путь к главному индексу с './'
    const mainIndexFile = toDotPath(srcPrefix, 'index.ts');

    const rawPkgData = {
      // general
      name: `${scopeName}/` + folder.name.replaceAll(sourcePath + '/', '').replaceAll(`/`, `-`),
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
      module: mainIndexFile,
      main: mainIndexFile,
      types: mainIndexFile,
      typesVersions: {
        '*': {
          '.': [mainIndexFile],
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
      ...dynamicData.otherCmd,
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
    const contentF = JSON.stringify(pkgData, null, 2) + '\n';
    if (fs.readFileSync(folder.path, 'utf-8') === contentF) {
      return;
    }
    fs.writeFileSync(folder.path, contentF);
    console.log(`✓ Create: ${folder.name} -> ${pkgData.name}`);
  });
}
