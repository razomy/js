import {Storage} from '@google-cloud/storage';
import {downloadFilesRecursive} from './download_files_recursive';

export async function downloadFilesFromStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await downloadFilesRecursive(bucket, folderPath);
  console.log('All files downloaded successfully.');
}
