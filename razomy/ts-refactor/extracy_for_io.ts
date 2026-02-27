import {Project} from 'ts-morph';
import path from 'path';
import {snakeCase} from '@razomy/string-case';
import * as fss from '@razomy/fss';
import {createDistSpecifications} from './create_dist_specifications';
import {createPackageReadme} from './create_package_readme';
import {getPackageFunctions} from './get_package_functions';

export async function extracyForIo(dirPath) {
  const functionsFiles = getPackageFunctions(dirPath);
  console.log(functionsFiles);
  const project = new Project({tsConfigFilePath: '../../' + 'tsconfig.json'});

  async function createDistSpecificationsCb(n) {
    return await createDistSpecifications(project, path.resolve(`${dirPath}/${snakeCase(n)}.ts`), n);
  }

  const files = await Promise.all(functionsFiles.map(createDistSpecificationsCb));
  const str = `${JSON.stringify(files, null, 2)}`
  fss.file.setSync(`${dirPath}/dist/specifications.json`, str);
  createPackageReadme(fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}

// console.log(JSON.stringify(extracyForIo('../string-case/'), null, 2));
