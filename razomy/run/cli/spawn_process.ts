import {ChildProcess, execSync, spawn} from "child_process";
import {platform} from "os";

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
        execSync(`taskkill /pid ${child.pid} /T /F`, {stdio: 'ignore'});
      } catch (e) {
      }
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

// 2. Атомарный парсер (Без изменений)
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

// =====================================================================
// 3. ОСНОВНАЯ ФУНКЦИЯ (Авто-определение Сервер/Скрипт)
// =====================================================================
export async function spawnProcess(
  command: string,
  args: string[],
  cwd: string,
  env: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd, env});
    ProcessManager.register(child);

    let outputBuffer = '';
    let isServerMode = false; // Функция сама догадается

    function handleStream (chunk: string) {
            // Если мы уже поняли, что это сервер - логи не копим (защита от утечек памяти)
            if (isServerMode) return;

            outputBuffer += chunk;

            // АВТО-ОПРЕДЕЛЕНИЕ СЕРВЕРА:
            // Если Python скрипт напечатал это слово, значит он перешел в режим сервера
            if (outputBuffer.includes('__SERVER_READY__')) {
              isServerMode = true;
              outputBuffer = ''; // Очищаем память, буфер логов больше не нужен

              // Возвращаем спец-объект. Процесс продолжает работать в фоне!
              resolve({
                __is_server: true, // Метка для вашего кода
                process: child,
                kill: () => ProcessManager.killTree(child)
              });
            }
          }

    child.stdout.on('data', (data) => handleStream(data.toString()));
    child.stderr.on('data', (data) => handleStream(data.toString()));

    child.on('close', (code) => {
      ProcessManager.unregister(child);

      // Если это был сервер, Promise уже давно зарезолвлен, делать ничего не надо
      if (isServerMode) return;

      // Если дошли сюда, значит это был обычный CLI скрипт. Ищем результат:
      try {
        const result = parseCliResult(outputBuffer);
        if (result !== null) {
          resolve(result); // Возвращаем обычный результат как раньше
        } else {
          reject(new Error(`Runner failed (No __CLI_RESULT__). Code: ${code}\nLogs: ${outputBuffer}`));
        }
      } catch (e) {
        reject(new Error(`Runner logic error. Code: ${code}\nError: ${(e as Error).message}\nLogs: ${outputBuffer}`));
      }
    });
  });
}

