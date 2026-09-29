import * as path from 'path';
import * as fsDirectory from '@razomy/fs-directory';
import * as storageGoogle from '@razomy/storage-google';

export async function downloadFileRecursiveFile(file, folderPath, destinationPath = '') {
  const filePath = file.name.replace(folderPath, '');
  const dirPath = path.join(folderPath, destinationPath);
  const destinationFile = path.join(folderPath, destinationPath, filePath);
  fsDirectory.tryCreate(dirPath);
  await file.download({ destination: destinationFile });
}

export class CloudFileStore {
  async downloadFile(bucketName, filePath, folderPath) {
    await storageGoogle.downloadFile(bucketName, filePath, folderPath);
  }

  async uploadFile(bucketName, filePath, folderPath) {
    await storageGoogle.uploadFile(bucketName, filePath, folderPath);
  }
}
