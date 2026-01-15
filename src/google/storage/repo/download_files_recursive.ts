import {download_file_recursive_file} from './lib';

export async function download_files_recursive(bucket, folder_path, destination_path = '') {
    const [files] = await bucket.getFiles();
    const download_promises = files.map(async (file) => {
            await download_file_recursive_file(file, folder_path, destination_path);
            // console.log(`Downloaded ${file.name} to ${destinationFile}`);
          });
    await Promise.all(download_promises);
}
