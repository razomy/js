import {Storage} from '@google-cloud/storage';
import {downloadFileRecursiveFile} from './download_file_recursive_file';

export async function downloadFile(bucketName: string, filePath, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const file = await bucket.file(filePath);
  await downloadFileRecursiveFile(file, folderPath, '');
}
