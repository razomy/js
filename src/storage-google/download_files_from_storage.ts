import { Storage } from '@google-cloud/storage';
import * as storageGoogle from '@razomy/storage-google';

export async function downloadFilesFromStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await storageGoogle.downloadFilesRecursive(bucket, folderPath);
  console.log('All files downloaded successfully.');
}
