
import path from 'path';
import {create_directory_if_not_exists} from 'src/fs/directory/create';
import {download_file} from './download_file';
import {upload_file} from './upload_file';

export async function download_file_recursive_file(file, folderPath, destinationPath = '') {
  const file_path = file.name.replace(folderPath, '');
  const dir_path = path.join(folderPath, destinationPath);
  const destination_file = path.join(folderPath, destinationPath, file_path);
  create_directory_if_not_exists(dir_path);
  await file.download({ destination: destination_file });
}

export class CloudFileStore {
  async downloadFile(bucketName, filePath, folderPath) {
    await download_file(bucketName, filePath, folderPath);
  }

  async uploadFile(bucketName, filePath, folderPath) {
    await upload_file(bucketName, filePath, folderPath);
  }
}
