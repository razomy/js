// Imports
import { BuildTarget, CpuArchitecture, OperatingSystem, PackageFormat } from './build_config';
import type { BuildConfig, IoEnvironment } from './build_config';
import type { DownloadInfo, RuntimeProvider } from './download_info';
import type { HardwareResourceLimit } from './hardware_resource_limit';

// Named exports
export {
  BuildTarget,
  CpuArchitecture,
  OperatingSystem,
  PackageFormat
};
export type {
  BuildConfig,
  DownloadInfo,
  HardwareResourceLimit,
  IoEnvironment,
  RuntimeProvider
};

// Default export
const runtimes = {
  BuildTarget,
  CpuArchitecture,
  OperatingSystem,
  PackageFormat,
};


export default runtimes;
