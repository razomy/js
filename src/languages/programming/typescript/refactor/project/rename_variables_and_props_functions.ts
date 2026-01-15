import {Project} from 'ts-morph';
import {if_main} from 'razomy.main';
import {
  file_rename_variables_and_props_functions
} from 'razomy.languages/programming/typescript/refactor/file_rename_variables_and_props_functions';

export async function rename_variables_and_props_functions() {
  const project = new Project({
    tsConfigFilePath: '../../../../../../tsconfig.json',
  });

  const source_files = project.getSourceFiles();

  for (const file of source_files) {
    file_rename_variables_and_props_functions(file);
  }

  await project.save();
}

if_main(import.meta.url, rename_variables_and_props_functions).then()