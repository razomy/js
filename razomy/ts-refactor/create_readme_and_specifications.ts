import {Project} from 'ts-morph';
import * as fss from '@razomy/fss';
import path from 'path';
import * as tsRl from '@razomy/ts-rl';
import * as tsRefactor from '@razomy/ts-refactor';

export async function createReadmeAndSpecifications(dirPath) {
  const project = new Project({tsConfigFilePath: '../../' + 'tsconfig.json'});
  project.addSourceFileAtPath(path.join(dirPath, 'package.json'));

  const ctx = new tsRl.st.SemanticContext();
  const ast = tsRl.ast.parsePackage(project, dirPath, ctx)!;
  ctx.root = tsRl.hir.astToHirNode(ast);
  tsRl.st.indexNodes(ctx, ctx.getSemantic(ctx.root));
  tsRl.st.linkHirTree(ctx, ctx.getSemantic(ctx.root));
  tsRl.st.joinDocs(ctx, ctx.getSemantic(ctx.root));

  const str = `${JSON.stringify(ctx.root, null, 2)}`;
  fss.directory.tryCreate(`${dirPath}/dist/specifications`);
  fss.file.setSync(`${dirPath}/dist/specifications/packageDeclaration.json`, str);
  tsRefactor.createReadme(dirPath, fss.file.getJson(dirPath + '/package.json'), ctx);
  return ctx;
}
