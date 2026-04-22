import { Storage } from '@google-cloud/storage';
import * as storageGoogle from '@razomy/storage-google';

export async function downloadFile(bucketName: string, filePath, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const file = await bucket.file(filePath);
  await storageGoogle.downloadFileRecursiveFile(file, folderPath, '');
}
