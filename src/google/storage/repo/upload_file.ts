import { Storage } from "@google-cloud/storage";
import path from "path";

export async function upload_file(bucketName, fileName, folderPath) {
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    const file_path = path.join(folderPath, fileName);
    const upload_options = {
            destination: fileName,
          };
    await bucket.upload(file_path, upload_options);
}
