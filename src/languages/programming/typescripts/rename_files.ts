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

  const sourceFiles = project.getSourceFiles();
  let count = 0;

  for (const file of sourceFiles) {
    const baseName = file.getBaseNameWithoutExtension();
    const ext = file.getExtension();

    const newName = to_snake_case(baseName);

    // Skip if name hasn't changed
    if (baseName === newName) continue;

    file.move(`${file.getDirectory().getPath()}/${newName}${ext}`);
    console.log(`[RENAME] ${baseName}${ext} -> ${newName}${ext}`);
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