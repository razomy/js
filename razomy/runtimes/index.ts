// Imports
import { BuildTarget, CpuArchitecture, OperatingSystem, PackageFormat } from './environment';
import type { BuildConfig, IoEnvironment } from './environment';
import type { HardwareResourceLimit } from './hardware_resource_limit';
import type { DownloadInfo, RuntimeProvider } from './types';

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
