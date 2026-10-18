import { Project, SourceFile } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';

export interface IterateSourceFileState {
  project: Project;
  sourceFile: SourceFile;
}

export async function iterateSourceFilesAndSave(
  projectPath: string,
  action: abstractions.function_.Action<[IterateSourceFileState]>,
) {
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
    skipAddingFilesFromTsConfig: false,
  });

  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    action({ project, sourceFile });
  }
  await project.save();
}
