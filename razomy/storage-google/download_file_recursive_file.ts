import * as path from 'path';
import * as fsDirectory from '@razomy/fs-directory';
import * as googleStorageRepo from './';

export async function downloadFileRecursiveFile(file, folderPath, destinationPath = '') {
  const filePath = file.name.replace(folderPath, '');
  const dirPath = path.join(folderPath, destinationPath);
  const destinationFile = path.join(folderPath, destinationPath, filePath);
  fsDirectory.tryCreate(dirPath);
  await file.download({ destination: destinationFile });
}

export class CloudFileStore {
  async downloadFile(bucketName, filePath, folderPath) {
    await googleStorageRepo.downloadFile(bucketName, filePath, folderPath);
  }

  async uploadFile(bucketName, filePath, folderPath) {
    await googleStorageRepo.uploadFile(bucketName, filePath, folderPath);
  }
}
