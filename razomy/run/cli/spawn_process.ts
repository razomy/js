import { ChildProcess, execSync, spawn } from 'child_process';
import { platform } from 'os';
import type { ChildProcessWithoutNullStreams } from 'node:child_process';

class ProcessManager {
  private static activeProcesses = new Set<ChildProcess>();

  static register(child: ChildProcess) {
    this.activeProcesses.add(child);
  }

  static unregister(child: ChildProcess) {
    this.activeProcesses.delete(child);
  }

  static killTree(child: ChildProcess) {
    if (child.killed || child.exitCode !== null) return;
    if (platform() === 'win32' && child.pid) {
      try {
        execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore' });
      } catch (e) {}
    } else {
      child.kill('SIGTERM');
    }
    this.unregister(child);
  }

  static killAll() {
    for (const child of this.activeProcesses) this.killTree(child);
  }
}

process.on('exit', () => ProcessManager.killAll());
process.on('SIGINT', () => {
  ProcessManager.killAll();
  process.exit(0);
});
process.on('SIGTERM', () => {
  ProcessManager.killAll();
  process.exit(0);
});

function parseCliResult(output: string): any {
  const lines = output.trim().split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('__CLI_RESULT__:')) {
      const jsonStr = lines[i].replace('__CLI_RESULT__:', '');
      const parsed = JSON.parse(jsonStr);
      if (parsed.status === 'success') return parsed.result;
      throw new Error(parsed.message);
    }
  }
  return null;
}

export async function spawnProcess(
  command: string,
  args: string[],
  cwd: string,
  env: any,
): Promise<
  | {
      isServer: true;
      process: ChildProcessWithoutNullStreams;
      kill: () => void;
    }
  | null
  | string
> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env });
    ProcessManager.register(child);

    let outputBuffer = '';
    let isServerMode = false;

    function handleStream(chunk: string) {
      if (isServerMode) return;

      outputBuffer += chunk;

      // АВТО-ОПРЕДЕЛЕНИЕ СЕРВЕРА:
      if (outputBuffer.includes('__SERVER_READY__')) {
        isServerMode = true;
        outputBuffer = '';

        resolve({
          isServer: true,
          process: child,
          kill: () => ProcessManager.killTree(child),
        });
      }
    }

    child.stdout.on('data', (data) => handleStream(data.toString()));
    child.stderr.on('data', (data) => handleStream(data.toString()));

    child.on('close', (code) => {
      ProcessManager.unregister(child);

      if (isServerMode) return;

      try {
        const result = parseCliResult(outputBuffer);
        if (result !== null) {
          resolve(result);
        } else {
          reject(new Error(`Runner failed (No __CLI_RESULT__). Code: ${code}\nLogs: ${outputBuffer}`));
        }
      } catch (e) {
        reject(new Error(`Runner logic error. Code: ${code}\nError: ${(e as Error).message}\nLogs: ${outputBuffer}`));
      }
    });
  });
}
