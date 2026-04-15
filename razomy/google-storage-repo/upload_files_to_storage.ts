import { Storage } from '@google-cloud/storage';
import * as googleStorageRepo from "@razomy/google-storage-repo";

export async function uploadFilesToStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await googleStorageRepo.uploadFilesRecursive(bucket, folderPath);
  console.log('All files uploaded successfully.');
}
