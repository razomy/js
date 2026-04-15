import { Project } from 'ts-morph';
import * as fss from '@razomy/fss';
import path from 'path';
import * as tsTranslators from '@razomy/ts-translators';
import * as tsRefactor from '@razomy/ts-refactor';

export async function createReadmeAndSpecifications(dirPath) {
  const project = new Project({ tsConfigFilePath: '../../' + 'tsconfig.json' });
  project.addSourceFileAtPath(path.join(dirPath, 'package.json'));
  const files = tsTranslators.ast.bindings.getPackageDeclaration(project, dirPath);

  const str = `${JSON.stringify(files, null, 2)}`;
  fss.directory.tryCreate(`${dirPath}/dist/specifications`);
  fss.file.setSync(`${dirPath}/dist/specifications/packageDeclaration.json`, str);
  tsRefactor.createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), files);
  return files;
}
