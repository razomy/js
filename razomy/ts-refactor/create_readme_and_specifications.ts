import {Project} from 'ts-morph';
import * as fss from '@razomy/fss';
import {getPackageDeclaration} from '../ts-translators/ast/bindings/get_package_declaration';
import {createReadme} from './create_readme';
import path from "path";

export async function createReadmeAndSpecifications(dirPath) {
  const project = new Project({tsConfigFilePath: '../../' + 'tsconfig.json'});
  project.addSourceFileAtPath(path.join(dirPath, "package.json"))
  const files = getPackageDeclaration(project, dirPath);

  const str = `${JSON.stringify(files, null, 2)}`;
  fss.directory.tryCreate(`${dirPath}/dist/specifications`);
  fss.file.setSync(`${dirPath}/dist/specifications/packageDeclaration.json`, str);
  createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}
