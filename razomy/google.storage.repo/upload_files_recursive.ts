import fs from 'fs';
import path from 'path';

export async function uploadFilesRecursive(bucket, folderPath, destinationPath = '') {
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
      await uploadFilesRecursive(bucket, subfolderPath, subfolderDestination);
    }
  });
  await Promise.all(uploadPromises);
}
