import { Storage } from '@google-cloud/storage';
import path from 'path';

export async function upload_file(bucket_name, file_name, folder_path) {
    const storage = new Storage();
    const bucket = storage.bucket(bucket_name);
    const file_path = path.join(folder_path, file_name);
    const upload_options = {
            destination: file_name,
          };
    await bucket.upload(file_path, upload_options);
}
