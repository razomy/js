import { Project } from 'ts-morph';
import * as fsFile from '@razomy/fs-file';
import * as tsRefactor from '@razomy/ts-refactor';

export async function renameFiles(projectPath: string) {
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
  });
  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    const { baseName, ext } = tsRefactor.getNameAndExt(sourceFile);
    const newName = tsRefactor.toSafeFilename(baseName);

    // Skip if name hasn't changed
    if (baseName === newName) continue;
    if (baseName === 'index') continue;
    if (baseName === 'prisma') continue;

    const path = `${sourceFile.getDirectory().getPath()}/${newName}${ext}`;
    if (fsFile.isExist(path)) {
      console.log(`ERROR ${baseName}${ext} -> ${newName}${ext}`);
      continue;
    }
    console.log(`[RENAME] ${baseName}${ext} -> ${newName}${ext}`);
    sourceFile.move(path);
  }

  await project.save();
}
