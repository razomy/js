import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';


export function formatNumber(number) {
  return number.toFixed(2);
}

function writeToFile(baseDir, filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(baseDir, filename), content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}

function gitCommit(baseDir, message) {
  return new Promise((resolve, reject) => {
    exec(message, {cwd: baseDir}, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

export async function exportFiles(baseDir) {
  baseDir = path.resolve(baseDir);

  const {Storage} = await import('@google-cloud/storage');

  const storage = new Storage();

  const bucket = await storage.bucket('notation');
  // const fileName = 'start.rn';
  let [files] = await bucket.getFiles({
    // prefix: fileName,
    // maxResults: 5,
    versions: true,
  });
  files = files.sort((a, b) => new Date(a.metadata.timeCreated).getTime() - new Date(b.metadata.timeCreated).getTime());

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const date = file.metadata.timeCreated;
    const filePath = 'data/' + fileName;

    const [contents] = await file.download();
    const content = contents.toString();
    const commitMessage = `Update fileName:${fileName} date:${date}`;

    try {
      await writeToFile(baseDir, filePath, content);
      await gitCommit(baseDir, `git add ${filePath} && git commit --date ${date} -m "${commitMessage}"`);
    } catch (e) {
      console.log(e);
    }
    console.log(`Add ${i} of ${files.length} ${formatNumber(i / files.length * 100)} %`);
    // return;
  }
}
