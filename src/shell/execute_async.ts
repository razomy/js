import {spawn, ChildProcess} from 'child_process';

function execute_async<T = string>(command: string, options: { cwd?: string }): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const child: ChildProcess = spawn(command, {...options, shell: true});

    let stdout = '';
    let stderr = '';

    child.stdout!.on('data', (data) => {
      stdout += data;
    });

    child.stderr!.on('data', (data) => {
      stderr += data;
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      } else {
        resolve(stdout as T);
      }
    });
  });
}

export default execute_async;
