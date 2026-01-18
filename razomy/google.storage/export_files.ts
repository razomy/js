import path from 'path';
import {string} from 'razomy.number.string';
import {executeAsync} from 'razomy.shell';
import {setAsync} from 'razomy.fs.file';


export async function exportFiles(baseDir) {
  baseDir = path.resolve(baseDir);

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
    const fileName = file.name;
    const date = file.metadata.timeCreated;
    const filePath = 'data/' + fileName;

    const [contents] = await file.download();
    const content = contents.toString();
    const commitMessage = `Update fileName:${fileName} date:${date}`;

    try {
      await setAsync(path.join(baseDir, filePath), content);
      await executeAsync(`git add ${filePath} && git commit --date ${date} -m "${commitMessage}"`, {cwd: baseDir});
    } catch (e) {
      console.log(e);
    }
    console.log(`Add ${i} of ${files.length} ${string(i / files.length * 100)} %`);
    // return;
  }
}
