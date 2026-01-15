import {Project} from 'ts-morph';
import {to_snake_case} from 'razomy.string';
import {if_main} from 'razomy.main';
import { is_exist } from 'src/fs/file';


export async function rename_files() {
  const project = new Project({
    tsConfigFilePath: '../../../../../../tsconfig.json',
  });

  const source_files = project.getSourceFiles();
  for (const file of source_files) {
    let base_name = file.getBaseNameWithoutExtension();
    let ext = file.getExtension();

    if (base_name.endsWith('.test')) {
      base_name = base_name.replace('.test', '');
      ext = '.test' + ext;
    }
    if (base_name.endsWith('.spec')) {
      base_name = base_name.replace('.spec', '');
      ext = '.spec' + ext;
    }

    const new_name = to_snake_case(base_name);

    // Skip if name hasn't changed
    if (base_name === new_name) continue;
    if (base_name === new_name) continue;

    const path = `${file.getDirectory().getPath()}/${new_name}${ext}`;
    if(is_exist(path)){
      continue
    }
    console.log(`[RENAME] ${base_name}${ext} -> ${new_name}${ext}`);
    file.move(path);
  }

  await project.save();
}

if_main(import.meta.url, rename_files).then();
