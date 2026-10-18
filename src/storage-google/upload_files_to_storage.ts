import { Storage } from '@google-cloud/storage';
import * as storageGoogle from '@razomy/storage-google';

export async function uploadFilesToStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await storageGoogle.uploadFilesRecursive(bucket, folderPath);
  console.log('All files uploaded successfully.');
}
