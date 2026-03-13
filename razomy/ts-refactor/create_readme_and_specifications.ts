import { Project } from 'ts-morph';
import path from 'path';
import * as fss from '@razomy/fss';
import { createDistSpecifications } from './create_dist_specifications';
import { createPackageReadme } from './create_package_readme';
import {getExportedFunctions} from './get_exported_functions';
import { getFilteredSourceFiles } from './get_filtered_source_files';
import {getExportedConstants} from './get_exported_constants';
import {getExportedClasses} from './get_exported_classes';
import {getExportedTypes} from './get_exported_types';

export async function createReadmeAndSpecifications(dirPath) {
  const project = new Project({ tsConfigFilePath: '../../' + 'tsconfig.json' });
  const sources = getFilteredSourceFiles(project, dirPath);

  const constantsFiles = getExportedConstants(sources);
  const functionsFiles = getExportedFunctions(sources);
  const typeFiles = getExportedTypes(sources);
  const classesFiles = getExportedClasses(sources);
  console.info(constantsFiles);
  console.info(typeFiles);
  console.info(classesFiles);
  console.info(functionsFiles);

  async function createDistSpecificationsCb(n) {
    return await createDistSpecifications(project, path.resolve(n.path), n.name);
  }

  const files = await Promise.all(functionsFiles.map(createDistSpecificationsCb));
  const str = `${JSON.stringify(files, null, 2)}`;
  fss.file.setSync(`${dirPath}/dist/specifications.json`, str);
  createPackageReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}
