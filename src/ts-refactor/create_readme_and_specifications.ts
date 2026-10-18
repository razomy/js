import * as fss from '@razomy/fss';
import * as tsRl from '@razomy/ts-rl';
import * as tsRefactor from '@razomy/ts-refactor';

export async function createReadmeAndSpecifications(dirPath) {
  const ctx = tsRl.hir.semanticContextFromTsPackageFolder(dirPath);
  const str = tsRl.hir.hirToJsonString(ctx.hirRoot);
  fss.directory.tryCreate(`${dirPath}/dist/specifications`);
  fss.file.setSync(`${dirPath}/dist/specifications/packageDeclaration.json`, str);
  tsRefactor.createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), ctx);
  return ctx;
}
