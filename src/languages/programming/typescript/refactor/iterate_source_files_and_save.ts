import {Action} from 'razomy.action';
import {Project, SourceFile} from 'ts-morph';

export interface IterateSourceFileState {
  project: Project,
  source_file: SourceFile
}

export async function iterate_source_files_and_save(project_path: String, action: Action<IterateSourceFileState>) {
  const project = new Project({
    tsConfigFilePath: project_path + 'tsconfig.json',
    skipAddingFilesFromTsConfig: false,
  });

  const source_files = project.getSourceFiles();
  for (const source_file of source_files) {
    action({project, source_file})
  }
  await project.save();
}