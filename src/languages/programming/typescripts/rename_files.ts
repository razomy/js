import {Project} from 'ts-morph';

const toPascalCase = (str: string) => {
  let ff = str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  ff = ff.charAt(0).toLowerCase() + ff.slice(1)
  return ff
};

const renameWithMorph = async () => {
  // Initialize with your tsconfig
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
    skipAddingFilesFromTsConfig: false,
  });

  const sourceFiles = project.getSourceFiles();
  let count = 0;

  for (const file of sourceFiles) {
    const baseName = file.getBaseNameWithoutExtension();
    const ext = file.getExtension();

    // Skip if already PascalCase or no underscores
    // if (!baseName.includes('_')) continue;

    const newName = toPascalCase(baseName) + ext;

    // file.move() renames the file AND updates imports in other files
    file.move(file.getDirectory().getPath() + '/' + newName);
    console.log(`[RENAME] ${baseName}${ext} -> ${newName}`);
    count++;
  }

  if (count > 0) {
    console.log(`Saving ${count} changes...`);
    await project.save(); // Writes changes to disk
  } else {
    console.log('No files needed renaming.');
  }
};

renameWithMorph();