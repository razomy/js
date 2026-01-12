import { Project } from 'ts-morph';

const to_snake_case = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert _ before capitals
    .replace(/[\s-]+/g, '_')             // Replace spaces and hyphens with _
    .toLowerCase();
};

const rename_with_morph = async () => {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const source_files = project.getSourceFiles();
  let count = 0;

  for (const file of source_files) {
    const base_name = file.getBaseNameWithoutExtension();
    const ext = file.getExtension();

    const new_name = to_snake_case(base_name);

    // Skip if name hasn't changed
    if (base_name === new_name) continue;

    file.move(`${file.getDirectory().getPath()}/${new_name}${ext}`);
    console.log(`[RENAME] ${base_name}${ext} -> ${new_name}${ext}`);
    count++;
  }

  if (count > 0) {
    console.log(`Saving ${count} changes...`);
    await project.save();
  } else {
    console.log('No files needed renaming.');
  }
};

rename_with_morph();