import { Project } from 'ts-morph';
import path from 'path';
import { snakeCase } from '@razomy/string-case';
import * as fss from '@razomy/fss';
import { createDistSpecifications } from './create_dist_specifications';
import { createDistReadme } from './create_dist_readme';
import { getPackageFunctions } from './get_package_functions';

export function extracyForIo(dirPath) {
  const functionsFiles = getPackageFunctions(dirPath);
  console.log(functionsFiles);
  const project = new Project({ tsConfigFilePath: '../../' + 'tsconfig.json' });
  function f(n) {
    return createDistSpecifications(project, path.resolve(`${dirPath}${snakeCase(n)}.ts`), n);
  }
  const files = functionsFiles.map((i) => f(i));
  fss.file.setJson(`${dirPath}dist/specifications.json`, files);
  createDistReadme(fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}

// console.log(JSON.stringify(extracyForIo('../string-case/'), null, 2));
