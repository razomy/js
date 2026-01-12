import { Storage } from '@google-cloud/storage';

import fs from 'fs';
import path from 'path';
import {create_directory_if_not_exists} from 'razomy/fs/create';

async function download_file_recursive_file(file, folderPath, destinationPath = '') {
  const filePath = file.name.replace(folderPath, '');
  const dir_path = path.join(folderPath, destinationPath);
  const destinationFile = path.join(folderPath, destinationPath, filePath);
  create_directory_if_not_exists(dir_path);
  await file.download({ destination: destinationFile });
}

async function download_files_recursive(bucket, folderPath, destinationPath = '') {
  const [files] = await bucket.getFiles();

  const downloadPromises = files.map(async (file) => {
    await download_file_recursive_file(file, folderPath, destinationPath);
    // console.log(`Downloaded ${file.name} to ${destinationFile}`);
  });

  await Promise.all(downloadPromises);
}

async function upload_files_recursive(bucket, folderPath, destinationPath = '') {
  const items = await fs.promises.readdir(folderPath);

  const uploadPromises = items.map(async (item) => {
    const itemPath = path.join(folderPath, item);
    const stats = await fs.promises.stat(itemPath);

    if (stats.isFile()) {
      const uploadOptions = {
        destination: path.join(destinationPath, item),
      };
      await bucket.upload(itemPath, uploadOptions);
      // console.log(`Uploaded ${item} to ${bucket.name}/${uploadOptions.destination}`);
    } else if (stats.isDirectory()) {
      const subfolderPath = path.join(folderPath, item);
      const subfolderDestination = path.join(destinationPath, item);
      await upload_files_recursive(bucket, subfolderPath, subfolderDestination);
    }
  });

  await Promise.all(uploadPromises);
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

  const filePath = path.join(folderPath, fileName);
  const uploadOptions = {
    destination: fileName,
  };

  await bucket.upload(filePath, uploadOptions);
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
