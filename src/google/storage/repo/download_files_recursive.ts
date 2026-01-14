import download_file_recursive_file from './lib';

export default async function download_files_recursive(bucket, folderPath, destinationPath = '') {
    const [files] = await bucket.getFiles();
    const download_promises = files.map(async (file) => {
            await download_file_recursive_file(file, folderPath, destinationPath);
            // console.log(`Downloaded ${file.name} to ${destinationFile}`);
          });
    await Promise.all(download_promises);
}
