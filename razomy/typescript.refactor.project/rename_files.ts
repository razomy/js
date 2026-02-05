import {Project} from 'ts-morph';
import {isExist} from '@razomy/fs.file';
import {getNameAndExt} from '../typescript.refactor/get_name_and_ext';
import {toSafeFilename} from '../typescript.refactor/to_safe_filename';

export async function renameFiles(projectPath: string) {
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
  });
  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    let {baseName, ext} = getNameAndExt(sourceFile);
    const newName = toSafeFilename(baseName);

    // Skip if name hasn't changed
    if (baseName === newName) continue;
    if (baseName === 'index.ts') continue;

    const path = `${sourceFile.getDirectory().getPath()}/${newName}${ext}`;
    if (isExist(path)) {
      console.log(`ERROR ${baseName}${ext} -> ${newName}${ext}`);
      continue
    }
    console.log(`[RENAME] ${baseName}${ext} -> ${newName}${ext}`);
    sourceFile.move(path);
  }

  await project.save();
}
