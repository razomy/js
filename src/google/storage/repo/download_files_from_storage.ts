import { Storage } from '@google-cloud/storage';
import download_files_recursive from './download_files_recursive';

export default async function download_files_from_storage(bucketName, folderPath) {
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    await download_files_recursive(bucket, folderPath);
    console.log('All files downloaded successfully.');
}
