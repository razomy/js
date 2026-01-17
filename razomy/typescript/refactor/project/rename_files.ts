import {Project} from 'ts-morph';
import {is_exist} from 'razomy.fs/file';
import {get_name_and_ext} from '../get_name_and_ext';
import {to_safe_filename} from '../to_safe_filename';

export async function rename_files(project_path: string) {
  const project = new Project({
    tsConfigFilePath: project_path + 'tsconfig.json',
  });
  const source_files = project.getSourceFiles();
  for (const source_file of source_files) {
    let {base_name, ext} = get_name_and_ext(source_file);
    const new_name = to_safe_filename(base_name);

    // Skip if name hasn't changed
    if (base_name === new_name) continue;
    if (base_name === 'index.ts') continue;

    const path = `${source_file.getDirectory().getPath()}/${new_name}${ext}`;
    if (is_exist(path)) {
      console.log(`ERROR ${base_name}${ext} -> ${new_name}${ext}`);
      continue
    }
    console.log(`[RENAME] ${base_name}${ext} -> ${new_name}${ext}`);
    source_file.move(path);
  }

  await project.save();
}
