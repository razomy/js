import { Storage } from '@google-cloud/storage';
import * as googleStorageRepo from './';

export async function downloadFile(bucketName: string, filePath, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const file = await bucket.file(filePath);
  await googleStorageRepo.downloadFileRecursiveFile(file, folderPath, '');
}
