import { Storage } from '@google-cloud/storage';
import {download_files_recursive} from './download_files_recursive';

export async function download_files_from_storage(bucket_name, folder_path) {
    const storage = new Storage();
    const bucket = storage.bucket(bucket_name);
    await download_files_recursive(bucket, folder_path);
    console.log('All files downloaded successfully.');
}
