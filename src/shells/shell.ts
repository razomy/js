import { exec } from 'child_process';

export function executeAsync(command, opt) {
  return new Promise<Buffer>((resolve, reject) => {
    exec(command, opt, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}
