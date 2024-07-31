import fs from "fs";
import fsExtra from 'fs-extra';

export function deleteFile(filePath) {
  return fs.rmSync(filePath);
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
