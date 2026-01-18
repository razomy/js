import {Storage} from '@google-cloud/storage';
import {uploadFilesRecursive} from './upload_files_recursive';

export async function uploadFilesToStorage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  await uploadFilesRecursive(bucket, folderPath);
  console.log('All files uploaded successfully.');
}
