import { Storage } from '@google-cloud/storage';
import {upload_files_recursive} from './upload_files_recursive';

export async function upload_files_to_storage(bucketName, folderPath) {
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    await upload_files_recursive(bucket, folderPath);
    console.log('All files uploaded successfully.');
}
