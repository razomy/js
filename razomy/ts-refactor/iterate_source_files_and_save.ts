import { Project, SourceFile } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export interface IterateSourceFileState {
  project: Project;
  sourceFile: SourceFile;
}

export async function iterateSourceFilesAndSave(
  projectPath: String,
  action: abstracts.functions.Action<IterateSourceFileState>,
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
