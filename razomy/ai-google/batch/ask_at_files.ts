import path from 'path';
import * as file from '@razomy/fs-file';
import * as aiGoogle from "@razomy/ai-google";

export async function askAtFiles(files_: string[]) {
  const files = files_.map((f) => file.getSync(path.resolve(__dirname, f)));
  const results = await aiGoogle.batch.asks(files, '');
  results!.forEach((c, i) => {
    if (!c) {
      return;
    }
    const d = '\n' + ('-'.repeat(100) + '\n').repeat(3) + '\n';
    file.appendSync(files[i], d + c.text);
  });
}
