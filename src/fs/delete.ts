import fs from 'fs';
import fsExtra from 'fs-extra';

export function deletei(filePath: string) {
  return fs.rmSync(filePath, {recursive: true, force: true});
}

export const clearDirectoryAsync = async (directoryPath) => {
  try {
    await fsExtra.emptyDir(directoryPath);
    console.log(`Directory cleared: ${directoryPath}`);
  } catch (error) {
    console.error(`Error clearing directory: ${directoryPath}`);
    console.error(error);
  }
};
