import fs from "fs";
import path from "path";

export async function upload_files_recursive(bucket, folderPath, destinationPath = '') {
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
