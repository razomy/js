import { Storage } from '@google-cloud/storage';
import {download_file_recursive_file} from './lib';

export async function download_file(bucket_name: string, file_path, folder_path) {
    const storage = new Storage();
    const bucket = storage.bucket(bucket_name);
    const file = await bucket.file(file_path);
    await download_file_recursive_file(file, folder_path, '');
}
