import path from 'path';
import {string} from 'razomy.number/string/string';
import {execute_async} from 'razomy.shell/execute_async';
import {set_async} from 'razomy.fs/file/set_async';


export async function export_files(base_dir) {
  base_dir = path.resolve(base_dir);

  const storage_ = await import('@google-cloud/storage');

  const storage = new storage_.Storage();

  const bucket = await storage.bucket('notation');
  // const fileName = 'start.rn';
  let [files] = await bucket.getFiles({
    // prefix: fileName,
    // maxResults: 5,
    versions: true,
  });
  files = files.sort((a, b) => new Date(a.metadata.timeCreated!).getTime() - new Date(b.metadata.timeCreated!).getTime());

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const file_name = file.name;
    const date = file.metadata.timeCreated;
    const file_path = 'data/' + file_name;

    const [contents] = await file.download();
    const content = contents.toString();
    const commit_message = `Update fileName:${file_name} date:${date}`;

    try {
      await set_async(path.join(base_dir, file_path), content);
      await execute_async(`git add ${file_path} && git commit --date ${date} -m "${commit_message}"`, {cwd: base_dir});
    } catch (e) {
      console.log(e);
    }
    console.log(`Add ${i} of ${files.length} ${string(i / files.length * 100)} %`);
    // return;
  }
}
