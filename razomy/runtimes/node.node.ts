import * as fs from 'node:fs';
import path from 'node:path';
import * as run from '@razomy/run/node';
import * as runtimes from '@razomy/runtimes/node';

function getContext(versionRuntimeDir: string) {
  const nodeExe = runtimes.getExePath(versionRuntimeDir, 'bin/node', 'node.exe');
  const binPath = runtimes.IS_WIN ? versionRuntimeDir : path.join(versionRuntimeDir, 'bin');
  const npmJsPath = runtimes.IS_WIN
    ? path.join(versionRuntimeDir, 'node_modules', 'npm', 'bin', 'npm-cli.js')
    : path.join(versionRuntimeDir, 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js');

  const env = { ...process.env, PATH: `${binPath}${path.delimiter}${process.env.PATH}` };
  return { nodeExe, npmJsPath, env };
}

export const NODE_RUNTIME: runtimes.RuntimeProvider = {
  defaultVersion: '25.9.0',

  setup(versionWorkspaceDir) {
    const nodePath = path.join(versionWorkspaceDir, 'start_cli.mjs');
    const nodeCode = `import {cli} from '@razomy/run';\ncli.start();`;
    fs.writeFileSync(nodePath, nodeCode);
  },

  run(versionWorkspaceDir, versionRuntimeDir, packageName, functionName, params) {
    const { nodeExe, env } = getContext(versionRuntimeDir);
    return run.cli.spawnProcess(
      nodeExe.replace(/"/g, ''),
      ['start_cli.mjs', packageName, functionName, params],
      versionWorkspaceDir,
      env,
    );
  },

  install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const pkgJsonPath = path.join(versionWorkspaceDir, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify({ name: '@razomy/cli-env', version: '1.0.0' }));
    }
    const { nodeExe, npmJsPath, env } = getContext(versionRuntimeDir);
    runtimes.execCmd(`${nodeExe} "${npmJsPath}" install ${packageName}`, versionWorkspaceDir, env);
  },

  remove(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { nodeExe, npmJsPath, env } = getContext(versionRuntimeDir);
    runtimes.execCmd(`${nodeExe} "${npmJsPath}" uninstall ${packageName}`, versionWorkspaceDir, env);
  },

  list(versionWorkspaceDir: string): string[] {
    try {
      const pkgJsonPath = path.join(versionWorkspaceDir, 'package.json');
      if (!fs.existsSync(pkgJsonPath)) return [];
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      return Object.entries(pkg.dependencies || {}).map(([name, ver]) => `${name} (${ver})`);
    } catch {
      return [];
    }
  },

  async getDownloadInfo(version: string, platform: string, arch: string) {
    const v = version.startsWith('v') ? version : `v${version}`;
    const nodeArch = arch === 'arm64' ? 'arm64' : 'x64';

    if (platform === 'win32')
      return {
        filename: 'node.zip',
        url: `https://nodejs.org/dist/${v}/node-${v}-win-${nodeArch}.zip`,
      };
    if (platform === 'darwin')
      return {
        filename: 'node.tar.gz',
        url: `https://nodejs.org/dist/${v}/node-${v}-darwin-${nodeArch}.tar.gz`,
      };

    return { filename: 'node.tar.gz', url: `https://nodejs.org/dist/${v}/node-${v}-linux-${nodeArch}.tar.gz` };
  },
};
