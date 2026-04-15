import * as fs from 'node:fs';
import path from 'node:path';
import * as run from '@razomy/run';
import * as runtimes from '@razomy/runtimes';

// Настраиваем пути и переменные окружения
function getContext(versionRuntimeDir: string) {
  // Ищем исполняемый файл. Для Mac/Linux это 'podman', для Windows 'podman.exe'
  // Обратите внимание: в архивах Mac/Win бинарники могут лежать в папке podman-.../bin
  // getExePath должен уметь рекурсивно найти podman.exe в versionRuntimeDir
  const podmanExe = runtimes.getExePath(versionRuntimeDir, 'podman', 'podman.exe');

  // Добавляем директорию с podman в PATH
  const exeDir = path.dirname(podmanExe);
  const env = {
    ...process.env,
    PATH: `${exeDir}${path.delimiter}${process.env.PATH}`,
  };

  return { podmanExe, env };
}

export const PODMAN_RUNTIME: runtimes.RuntimeProvider = {
  defaultVersion: '4.9.3', // Стабильная версия

  // МАГИЯ ЗДЕСЬ: Подготовка окружения (создание микро-Linux для Mac/Win)
  setup(versionWorkspaceDir, versionRuntimeDir) {
    const { podmanExe, env } = getContext(versionRuntimeDir);

    // 1. Создаем файл-маркер, чтобы не инициализировать каждый раз
    const initFlagPath = path.join(versionWorkspaceDir, '.podman_initialized');

    // Если мы на Linux - контейнеры работают нативно, виртуалка не нужна
    if (process.platform === 'linux') {
      if (!fs.existsSync(initFlagPath)) fs.writeFileSync(initFlagPath, 'linux-native');
      return;
    }

    // --- Для Mac и Windows: Автоматический запуск движка ---
    try {
      // Проверяем состояние виртуальных машин
      const machineList = runtimes.execCmd(`${podmanExe} machine list`, versionWorkspaceDir, env);

      // Если нет машины по умолчанию, создаем её (скачивается образ Linux ~300мб)
      if (!machineList.includes('podman-machine-default')) {
        console.log('⚙️ Инициализация движка контейнеров (это произойдет только один раз и займет пару минут)...');
        runtimes.execCmd(`${podmanExe} machine init`, versionWorkspaceDir, env);
      }

      // Проверяем, запущена ли она (статус 'Running' или 'running')
      const isRunning = machineList.includes('Running') || machineList.match(/running/i);

      if (!isRunning) {
        console.log('🚀 Запуск движка контейнеров в фоне...');
        runtimes.execCmd(`${podmanExe} machine start`, versionWorkspaceDir, env);
      }

      if (!fs.existsSync(initFlagPath)) fs.writeFileSync(initFlagPath, 'mac-win-vm-ready');
    } catch (e) {
      console.error('❌ Ошибка при настройке движка контейнеров:', e);
    }
  },

  // Выполнение команды (запуск контейнера)
  run(versionWorkspaceDir, versionRuntimeDir, packageName, functionName, params) {
    const { podmanExe, env } = getContext(versionRuntimeDir);

    // Формируем: podman run --rm -i <имя_образа> <команда> <аргументы>
    const args = ['run', '--rm', '-i'];
    args.push(packageName);

    if (functionName) args.push(functionName);
    if (params && params.length > 0) args.push(...params);

    return run.cli.spawnProcess(podmanExe.replace(/"/g, ''), args, versionWorkspaceDir, env);
  },

  // Аналог "install" - скачивание образа
  install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { podmanExe, env } = getContext(versionRuntimeDir);
    // Добавляем docker.io/, чтобы скачивать из официального хаба докера
    const image = packageName.includes('/') ? packageName : `docker.io/library/${packageName}`;
    runtimes.execCmd(`${podmanExe} pull ${image}`, versionWorkspaceDir, env);
  },

  // Аналог "remove" - удаление образа
  remove(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { podmanExe, env } = getContext(versionRuntimeDir);
    runtimes.execCmd(`${podmanExe} rmi ${packageName}`, versionWorkspaceDir, env);
  },

  // Список скачанных образов
  list(versionWorkspaceDir: string, versionRuntimeDir: string): string[] {
    const { podmanExe, env } = getContext(versionRuntimeDir);
    try {
      const output = runtimes.execCmd(
        `${podmanExe} images --format "{{.Repository}}:{{.Tag}}"`,
        versionWorkspaceDir,
        env,
      );
      return output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  },

  // Метод для получения прямых ссылок на бинарники Podman
  async getDownloadInfo(version: string, platform: string, arch: string) {
    const v = version.startsWith('v') ? version : `v${version}`;
    const baseUrl = `https://github.com/containers/podman/releases/download/${v}`;

    // Windows (Пульт управления)
    if (platform === 'win32')
      return {
        filename: 'podman.zip',
        url: `${baseUrl}/podman-remote-release-windows_amd64.zip`,
      };

    // macOS (Пульт управления, поддерживает Intel и M1/M2/M3)
    if (platform === 'darwin') {
      const macArch = arch === 'arm64' ? 'arm64' : 'amd64';
      return {
        filename: 'podman.zip',
        url: `${baseUrl}/podman-remote-release-darwin_${macArch}.zip`,
      };
    }

    // Linux (Статический движок + пульт в одном лице)
    const linuxArch = arch === 'arm64' ? 'aarch64' : 'amd64';
    return {
      filename: 'podman.tar.gz',
      // Используем статическую сборку для Linux, чтобы не зависеть от системных библиотек
      url: `${baseUrl}/podman-linux-${linuxArch}.tar.gz`,
    };
  },
};
