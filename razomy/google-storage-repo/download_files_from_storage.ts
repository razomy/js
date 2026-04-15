import { Storage } from '@google-cloud/storage';
import * as googleStorageRepo from "@razomy/google-storage-repo";

export async function downloadFilesFromStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await googleStorageRepo.downloadFilesRecursive(bucket, folderPath);
  console.log('All files downloaded successfully.');
}
