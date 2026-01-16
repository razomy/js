import { Storage } from '@google-cloud/storage';
import {upload_files_recursive} from './upload_files_recursive';

export async function upload_files_to_storage(bucket_name, folder_path) {
    const storage = new Storage();
    const bucket = storage.bucket(bucket_name);
    await upload_files_recursive(bucket, folder_path);
    console.log('All files uploaded successfully.');
}
