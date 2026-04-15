export interface DownloadInfo {
  filename: string;
  url: string;
}

export interface RuntimeProvider {
  defaultVersion: string;
  getDownloadInfo(version: string, platform: string, arch: string): Promise<DownloadInfo>;
  install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string): void | Promise<void>;
  list(versionWorkspaceDir: string, versionRuntimeDir: string): string[];
  remove(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string): void | Promise<void>;
  run(
    versionWorkspaceDir: string,
    versionRuntimeDir: string,
    packageName: string,
    functionName: string,
    params: string,
  ): Promise<string> | any;
  setup(versionWorkspaceDir: string, runtime: string): void | Promise<void>;
}
