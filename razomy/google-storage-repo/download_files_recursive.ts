import * as googleStorageRepo from '@razomy/google-storage-repo';

export async function downloadFilesRecursive(bucket, folderPath, destinationPath = '') {
  const [files] = await bucket.getFiles();
  const downloadPromises = files.map(async (file) => {
    await googleStorageRepo.downloadFileRecursiveFile(file, folderPath, destinationPath);
    // console.log(`Downloaded ${file.name} to ${destinationFile}`);
  });
  await Promise.all(downloadPromises);
}
