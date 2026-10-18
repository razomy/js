// Imports
import { FsNodeType } from './fs_node';
import type { FsNode } from './fs_node';
import type { DirPath, FileContent, FileExtension, FileName, FilePath, HasAbsolutePath, HasCurrentDir, HasDirPath, HasFileName, HasFilePath, HasSourceDir, HasStartDir } from './has_dir_path';
import type { Media } from './media';

// Named exports
export {
  FsNodeType
};
export type {
  DirPath,
  FileContent,
  FileExtension,
  FileName,
  FilePath,
  FsNode,
  HasAbsolutePath,
  HasCurrentDir,
  HasDirPath,
  HasFileName,
  HasFilePath,
  HasSourceDir,
  HasStartDir,
  Media
};

// Default export
const fs = {
  FsNodeType,
};


export default fs;
