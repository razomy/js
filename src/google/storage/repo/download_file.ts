import { Storage } from "@google-cloud/storage";
import {download_file_recursive_file} from './lib';

export async function download_file(bucketName: string, filePath, folderPath) {
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    const file = await bucket.file(filePath);
    await download_file_recursive_file(file, folderPath, '');
}
