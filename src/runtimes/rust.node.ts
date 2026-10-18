import * as fs from 'node:fs';
import path from 'node:path';
import * as runNode from '@razomy/run/node';
import * as runtimesNode from '@razomy/runtimes/node';

function getContext(versionRuntimeDir: string) {
  const cargoBin = path.join(versionRuntimeDir, 'cargo', 'bin');
  const rustcBin = path.join(versionRuntimeDir, 'rustc', 'bin');
  const cargoExe = runtimesNode.getExePath(versionRuntimeDir, 'cargo/bin/cargo', 'cargo/bin/cargo.exe');
  const rustcExe = runtimesNode.getExePath(versionRuntimeDir, 'rustc/bin/rustc', 'rustc/bin/rustc.exe');

  const env = {
    ...process.env,
    PATH: `${cargoBin}${path.delimiter}${rustcBin}${path.delimiter}${process.env.PATH}`,
  };
  return { cargoExe, rustcExe, env };
}

export const RUST_RUNTIME: runtimesNode.RuntimeProvider = {
  defaultVersion: '1.94.1',

  setup(versionWorkspaceDir, versionRuntimeDir) {
    const { rustcExe, env } = getContext(versionRuntimeDir);
    const rustPath = path.join(versionWorkspaceDir, 'main.rs');
    const rustCode = `use razomy::run_cli;\nuse std::env;\n\nfunction main() {\n cli::start();\n}`;
    fs.writeFileSync(rustPath, rustCode);
    runtimesNode.execCmd(`${rustcExe} main.rs -o cli_runner`, versionWorkspaceDir, env);
  },

  run(versionWorkspaceDir, versionRuntimeDir, packageName, functionName, params) {
    const { env } = getContext(versionRuntimeDir);
    const executable = runtimesNode.IS_WIN ? 'cli_runner.exe' : './cli_runner';
    return runNode.cli.spawnProcess(executable, [packageName, functionName, params], versionWorkspaceDir, env);
  },

  install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { cargoExe, env } = getContext(versionRuntimeDir);
    const cargoTomlPath = path.join(versionWorkspaceDir, 'Cargo.toml');

    if (!fs.existsSync(cargoTomlPath)) {
      runtimesNode.execCmd(`${cargoExe} init --bin`, versionWorkspaceDir, env);
    }
    runtimesNode.execCmd(`${cargoExe} add ${packageName}`, versionWorkspaceDir, env);
  },

  remove(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { cargoExe, env } = getContext(versionRuntimeDir);
    runtimesNode.execCmd(`${cargoExe} remove ${packageName}`, versionWorkspaceDir, env);
  },

  list(versionWorkspaceDir: string): string[] {
    try {
      const cargoTomlPath = path.join(versionWorkspaceDir, 'Cargo.toml');
      if (!fs.existsSync(cargoTomlPath)) return [];

      const content = fs.readFileSync(cargoTomlPath, 'utf8');
      const match = content.match(/\[dependencies\]([\s\S]*?)(?:\n\[|$)/);
      if (!match) return [];

      return match[1]
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#'))
        .map((l) => l.replace(/=.*/, '').trim());
    } catch {
      return [];
    }
  },

  async getDownloadInfo(version: string, platform: string, arch: string) {
    let target = '';
    if (platform === 'win32') target = arch === 'arm64' ? 'aarch64-pc-windows-msvc' : 'x86_64-pc-windows-msvc';
    else if (platform === 'darwin') target = arch === 'arm64' ? 'aarch64-apple-darwin' : 'x86_64-apple-darwin';
    else target = arch === 'arm64' ? 'aarch64-unknown-linux-gnu' : 'x86_64-unknown-linux-gnu';
    return { filename: 'rust.tar.gz', url: `https://static.rust-lang.org/dist/rust-${version}-${target}.tar.gz` };
  },
};
