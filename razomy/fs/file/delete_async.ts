import fs from 'fs';

export async function delete_async(file_path: string) {
    return await fs.rmSync(file_path, {recursive: true, force: true});
}
