import {Project} from 'ts-morph';
import {
  file_rename_variables_and_props_functions
} from 'razomy.languages/programming/typescript/refactor/file_rename_variables_and_props_functions';

export async function rename_variables_and_props_functions(project_path: string) {
  const project = new Project({
    tsConfigFilePath: project_path + 'tsconfig.json',
  });

  const source_files = project.getSourceFiles();

  for (const file of source_files) {
    file_rename_variables_and_props_functions(file);
  }

  await project.save();
}
