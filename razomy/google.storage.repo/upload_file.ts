import {Storage} from '@google-cloud/storage';
import path from 'path';

export async function uploadFile(bucketName, fileName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const filePath = path.join(folderPath, fileName);
  const uploadOptions = {
    destination: fileName,
  };
  await bucket.upload(filePath, uploadOptions);
}
