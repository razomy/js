import path from 'path';
import copy_files_recursive from './file/copy';

export default async function cli() {
    const [, , ...args] = process.argv;
    if (args.length < 2) {
    console.error('Source and target files/directories are required.');
    process.exit(1);
    }

    const [source, target, ...excluded_dirs] = args;
    try {
    await copy_files_recursive(path.resolve(source) + '', path.resolve(target) + '', excluded_dirs);
    console.log('Files copied successfully.');
    } catch (error) {
    console.error('Error copying files:', error);
    }
}
