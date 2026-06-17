// Imports
import { cleanupExtractedStructure } from './cleanup_extracted_structure.node';
import { DEFAULT_PACKAGE, RUNTIME_REGISTRY } from './constants.node';
import { createSymlink } from './create_symlink.node';
import { downloadFile } from './download_file.node';
import { BuildTarget, CpuArchitecture, OperatingSystem, PackageFormat } from './environment';
import type { BuildConfig, IoEnvironment } from './environment';
import { execCmd } from './exec_cmd.node';
import { extractArchive } from './extract_archive.node';
import { IS_MAC, IS_WIN, getExePath } from './get_exe_path.node';
import type { HardwareResourceLimit } from './hardware_resource_limit';
import { JAVA_RUNTIME } from './java.node';
import { linkExists } from './link_exists.node';
import { NODE_RUNTIME } from './node.node';
import { PODMAN_RUNTIME } from './podman.node';
import { PYTHON_RUNTIME } from './python.node';
import { RUST_RUNTIME } from './rust.node';
import type { DownloadInfo, RuntimeProvider } from './types';

// Named exports
export {
  BuildTarget,
  CpuArchitecture,
  DEFAULT_PACKAGE,
  IS_MAC,
  IS_WIN,
  JAVA_RUNTIME,
  NODE_RUNTIME,
  OperatingSystem,
  PODMAN_RUNTIME,
  PYTHON_RUNTIME,
  PackageFormat,
  RUNTIME_REGISTRY,
  RUST_RUNTIME,
  cleanupExtractedStructure,
  createSymlink,
  downloadFile,
  execCmd,
  extractArchive,
  getExePath,
  linkExists
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
  cleanupExtractedStructure,
  DEFAULT_PACKAGE,
  RUNTIME_REGISTRY,
  createSymlink,
  downloadFile,
  BuildTarget,
  CpuArchitecture,
  OperatingSystem,
  PackageFormat,
  execCmd,
  extractArchive,
  IS_MAC,
  IS_WIN,
  getExePath,
  JAVA_RUNTIME,
  linkExists,
  NODE_RUNTIME,
  PODMAN_RUNTIME,
  PYTHON_RUNTIME,
  RUST_RUNTIME,
};


export default runtimes;
