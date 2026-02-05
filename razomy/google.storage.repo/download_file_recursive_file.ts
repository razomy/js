import * as path from 'path';
import {tryCreate} from '@razomy/fs.directory';
import {downloadFile} from './download_file';
import {uploadFile} from './upload_file';

export async function downloadFileRecursiveFile(file, folderPath, destinationPath = '') {
  const filePath = file.name.replace(folderPath, '');
  const dirPath = path.join(folderPath, destinationPath);
  const destinationFile = path.join(folderPath, destinationPath, filePath);
  tryCreate(dirPath);
  await file.download({destination: destinationFile});
}

export class CloudFileStore {
  async downloadFile(bucketName, filePath, folderPath) {
    await downloadFile(bucketName, filePath, folderPath);
  }

  async uploadFile(bucketName, filePath, folderPath) {
    await uploadFile(bucketName, filePath, folderPath);
  }
}
