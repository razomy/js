import fs from 'fs';
import path from 'path';

export async function upload_files_recursive(bucket, folder_path, destination_path = '') {
    const items = await fs.promises.readdir(folder_path);
    const upload_promises = items.map(async (item) => {
            const item_path = path.join(folder_path, item);
            const stats = await fs.promises.stat(item_path);

            if (stats.isFile()) {
              const upload_options = {
                destination: path.join(destination_path, item),
              };
              await bucket.upload(item_path, upload_options);
              // console.log(`Uploaded ${item} to ${bucket.name}/${uploadOptions.destination}`);
            } else if (stats.isDirectory()) {
              const subfolder_path = path.join(folder_path, item);
              const subfolder_destination = path.join(destination_path, item);
              await upload_files_recursive(bucket, subfolder_path, subfolder_destination);
            }
          });
    await Promise.all(upload_promises);
}
