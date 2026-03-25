import {Project} from 'ts-morph';
import * as fss from '@razomy/fss';
import {getPackageSpecifications} from './get_package_specifications';
import {createReadme} from './create_readme';

export async function createReadmeAndSpecifications(dirPath) {
  const project = new Project({tsConfigFilePath: '../../' + 'tsconfig.json'});
  const files = getPackageSpecifications(project, dirPath);

  const str = `${JSON.stringify(files, null, 2)}`;
  fss.file.setSync(`${dirPath}/dist/specifications.json`, str);
  createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}
