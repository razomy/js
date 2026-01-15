
import path from 'path';
import {create_directory_if_not_exists} from 'src/fs/directory/create';
import {download_file} from './download_file';
import {upload_file} from './upload_file';

export async function download_file_recursive_file(file, folder_path, destination_path = '') {
  const file_path = file.name.replace(folder_path, '');
  const dir_path = path.join(folder_path, destination_path);
  const destination_file = path.join(folder_path, destination_path, file_path);
  create_directory_if_not_exists(dir_path);
  await file.download({ destination: destination_file });
}

export class CloudFileStore {
  async download_file_(bucketName, filePath, folderPath) {
    await download_file(bucketName, filePath, folderPath);
  }

  async upload_file_(bucketName, filePath, folderPath) {
    await upload_file(bucketName, filePath, folderPath);
  }
}
