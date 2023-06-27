import { exec } from 'child_process';

export function execute(command, opt) {
  return new Promise((resolve, reject) => {
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

export async function tryLog(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}
