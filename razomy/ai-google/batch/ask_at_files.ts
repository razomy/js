import path from 'path';
import * as file from '@razomy/fs-file';
import { asks } from './asks';

export async function askAtFiles(files_: string[]) {
  const files = files_.map((f) => file.getSync(path.resolve(__dirname, f)));
  const results = await asks(files, '');
  results!.forEach((c, i) => {
    if (!c) {
      return;
    }
    const d = '\n' + ('-'.repeat(100) + '\n').repeat(3) + '\n';
    file.appendSync(files[i], d + c.text);
  });
}
