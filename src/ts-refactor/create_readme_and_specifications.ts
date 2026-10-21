import * as fss from '@razomy/fss';
import * as tsRefactor from '@razomy/ts-refactor';
import * as tsHir from "@razomy/ts-hir";

export async function createReadmeAndSpecifications(dirPath) {
  const ctx = tsHir.hir.semanticContextFromTsPackageFolder(dirPath);
  const str = tsHir.hir.hirToJsonString(ctx.hirRoot);
  fss.directory.tryCreate(`${dirPath}/dist/specifications`);
  fss.file.setSync(`${dirPath}/dist/specifications/packageDeclaration.json`, str);
  tsRefactor.createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), ctx);
  return ctx;
}
