import path from 'path';
import {copy} from './copy';

export async function cliCopy() {
  const [, , ...args] = process.argv;
  if (args.length < 2) {
    console.error('Source and target files/directories are required.');
    process.exit(1);
  }

  const [source, target, ...excludedDirs] = args;
  try {
    await copy(path.resolve(source) + '', path.resolve(target) + '', excludedDirs);
    console.log('Files copied successfully.');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}
