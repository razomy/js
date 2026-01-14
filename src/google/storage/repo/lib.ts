import { Storage } from '@google-cloud/storage';

import fs from 'fs';
import path from 'path';
import {create_directory_if_not_exists} from 'razomy.fs/create';

async function download_file_recursive_file(file, folderPath, destinationPath = '') {
  const file_path = file.name.replace(folderPath, '');
  const dir_path = path.join(folderPath, destinationPath);
  const destination_file = path.join(folderPath, destinationPath, file_path);
  create_directory_if_not_exists(dir_path);
  await file.download({ destination: destination_file });
}

async function download_files_recursive(bucket, folderPath, destinationPath = '') {
  const [files] = await bucket.getFiles();

  const download_promises = files.map(async (file) => {
    await download_file_recursive_file(file, folderPath, destinationPath);
    // console.log(`Downloaded ${file.name} to ${destinationFile}`);
  });

  await Promise.all(download_promises);
}

async function upload_files_recursive(bucket, folderPath, destinationPath = '') {
  const items = await fs.promises.readdir(folderPath);

  const upload_promises = items.map(async (item) => {
    const item_path = path.join(folderPath, item);
    const stats = await fs.promises.stat(item_path);

    if (stats.isFile()) {
      const upload_options = {
        destination: path.join(destinationPath, item),
      };
      await bucket.upload(item_path, upload_options);
      // console.log(`Uploaded ${item} to ${bucket.name}/${uploadOptions.destination}`);
    } else if (stats.isDirectory()) {
      const subfolder_path = path.join(folderPath, item);
      const subfolder_destination = path.join(destinationPath, item);
      await upload_files_recursive(bucket, subfolder_path, subfolder_destination);
    }
  });

  await Promise.all(upload_promises);
}


export async function download_file(bucketName:string, filePath, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);

  const file = await bucket.file(filePath);
  await download_file_recursive_file(file, folderPath, '');
}

export async function download_files_from_storage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);

  await download_files_recursive(bucket, folderPath);
  console.log('All files downloaded successfully.');
}

export async function upload_file(bucketName, fileName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);

  const file_path = path.join(folderPath, fileName);
  const upload_options = {
    destination: fileName,
  };

  await bucket.upload(file_path, upload_options);
}

export async function upload_files_to_storage(bucketName, folderPath) {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);

  await upload_files_recursive(bucket, folderPath);
  console.log('All files uploaded successfully.');
}

export class CloudFileStore {
  async downloadFile(bucketName, filePath, folderPath) {
    await download_file(bucketName, filePath, folderPath);
  }

  async uploadFile(bucketName, filePath, folderPath) {
    await upload_file(bucketName, filePath, folderPath);
  }
}
