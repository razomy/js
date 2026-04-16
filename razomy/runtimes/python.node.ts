import * as fs from 'node:fs';
import path from 'node:path';
import * as run from '@razomy/run/node';
import * as runtimes from '@razomy/runtimes/node';

// Контекст изолирует дубликаты переменных окружения и путей
function getContext(versionRuntimeDir: string, versionWorkspaceDir?: string) {
  const pyExe = runtimes.getExePath(versionRuntimeDir, 'bin/python3', 'python.exe');
  const binPath = runtimes.IS_WIN ? versionRuntimeDir : path.join(versionRuntimeDir, 'bin');

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    PATH: `${binPath}${path.delimiter}${process.env.PATH}`,
  };
  if (versionWorkspaceDir) env.PYTHONPATH = versionWorkspaceDir;

  return { pyExe, env };
}

export const PYTHON_RUNTIME: runtimes.RuntimeProvider = {
  defaultVersion: '3.14.4',

  setup(versionWorkspaceDir) {
    const pyPath = path.join(versionWorkspaceDir, 'start_cli.py');
    const pyCode = `from razomy.run import cli\ncli.start()`;
    fs.writeFileSync(pyPath, pyCode);
  },

  run(versionWorkspaceDir, versionRuntimeDir, packageName, functionName, params) {
    const { pyExe, env } = getContext(versionRuntimeDir);
    return run.cli.spawnProcess(
      pyExe.replace(/"/g, ''),
      ['start_cli.py', packageName, functionName, params],
      versionWorkspaceDir,
      env,
    );
  },

  install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { pyExe, env } = getContext(versionRuntimeDir);
    runtimes.execCmd(`${pyExe} -m pip install ${packageName} --target .`, versionWorkspaceDir, env);
  },

  remove(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { pyExe, env } = getContext(versionRuntimeDir, versionWorkspaceDir);
    runtimes.execCmd(`${pyExe} -m pip uninstall -y ${packageName}`, versionWorkspaceDir, env);
  },

  list(versionWorkspaceDir: string, versionRuntimeDir: string): string[] {
    try {
      const { pyExe, env } = getContext(versionRuntimeDir);
      const output = runtimes.execCmd(`${pyExe} -m pip freeze --path .`, versionWorkspaceDir, env, 'pipe');
      return output
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    } catch {
      return [];
    }
  },

  async getDownloadInfo(version: string, platform: string, arch: string) {
    const archMap = { x64: 'x86_64', arm64: 'aarch64' };
    const platformMap = { darwin: 'apple-darwin', linux: 'unknown-linux-gnu', win32: 'pc-windows-msvc-shared' };

    const targetArch = archMap[arch as keyof typeof archMap] || 'x86_64';
    const targetPlatform = platformMap[platform as keyof typeof platformMap];
    const apiUrl = 'https://api.github.com/repos/astral-sh/python-build-standalone/releases/latest';

    const response = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github.v3+json' } });
    const release = await response.json();

    const asset = release.assets.find((a: { name: string }) => {
      return (
        a.name.includes(`cpython-${version}`) &&
        a.name.includes(targetArch) &&
        a.name.includes(targetPlatform) &&
        a.name.includes('install_only')
      );
    });

    if (asset) return { filename: asset.name, url: asset.browser_download_url };
    throw new Error(`Бинарник для Python ${version} (${platform} ${arch}) не найден.`);
  },
};
