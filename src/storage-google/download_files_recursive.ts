import * as storageGoogle from '@razomy/storage-google';

export async function downloadFilesRecursive(bucket, folderPath, destinationPath = '') {
  const [files] = await bucket.getFiles();
  const downloadPromises = files.map(async (file) => {
    await storageGoogle.downloadFileRecursiveFile(file, folderPath, destinationPath);
    // console.log(`Downloaded ${file.name} to ${destinationFile}`);
  });
  await Promise.all(downloadPromises);
}
