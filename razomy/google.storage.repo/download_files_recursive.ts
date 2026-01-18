import {downloadFileRecursiveFile} from './download_file_recursive_file';

export async function downloadFilesRecursive(bucket, folderPath, destinationPath = '') {
  const [files] = await bucket.getFiles();
  const downloadPromises = files.map(async (file) => {
    await downloadFileRecursiveFile(file, folderPath, destinationPath);
    // console.log(`Downloaded ${file.name} to ${destinationFile}`);
  });
  await Promise.all(downloadPromises);
}
