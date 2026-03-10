import { Project } from 'ts-morph';
import path from 'path';
import { snakeCase } from '@razomy/string-case';
import * as fss from '@razomy/fss';
import { createDistSpecifications } from './create_dist_specifications';
import { createPackageReadme } from './create_package_readme';
import { getExportedFunctions } from './get_exported_functions';
import { getFilteredSourceFiles } from './get_filtered_source_files';

export async function extracyForIo(dirPath) {
  const project = new Project({ tsConfigFilePath: '../../' + 'tsconfig.json' });
  const sources = getFilteredSourceFiles(project, dirPath);
  const functionsFiles = getExportedFunctions(sources);
  console.log(functionsFiles);

  async function createDistSpecificationsCb(n) {
    return await createDistSpecifications(project, path.resolve(`${dirPath}/${snakeCase(n)}.ts`), n);
  }

  const files = await Promise.all(functionsFiles.map(createDistSpecificationsCb));
  const str = `${JSON.stringify(files, null, 2)}`;
  fss.file.setSync(`${dirPath}/dist/specifications.json`, str);
  createPackageReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}
