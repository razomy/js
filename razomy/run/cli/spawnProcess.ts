import {spawn} from "child_process";

export async function spawnProcess(command: string, args: string[], cwd: string, env: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd, env});
    let stdoutData = '';
    let stderrData = '';

    child.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });
    child.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    child.on('close', (code) => {
      // Ищем строку с нашим секретным префиксом с конца вывода
      const lines = stdoutData.trim().split('\n');
      let jsonResultStr: string | null = null;

      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].startsWith('__CLI_RESULT__:')) {
          jsonResultStr = lines[i].replace('__CLI_RESULT__:', '');
          break;
        }
      }

      if (!jsonResultStr) {
        // Если процесс упал и не выдал результат
        return reject(new Error(`Runner failed. Code: ${code}\nStderr: ${stderrData}\nStdout: ${stdoutData}`));
      }

      try {
        const parsed = JSON.parse(jsonResultStr);
        if (parsed.status === 'success') resolve(parsed.result);
        else reject(new Error(parsed.message));
      } catch (e) {
        reject(new Error(`Failed to parse runner output: ${jsonResultStr}`));
      }
    });
  });
}
