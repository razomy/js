import {
  appendOperationJsonl,
  appendRawLog,
  applyFromBackupFile,
  applyFromBackupStream,
  initBackupSession,
} from './backup';
import {
  applyOperationsToDisk,
  executeOperationOnDisk,
  getAllFiles,
  isPathSafe,
  readFileSafe,
  shouldIgnoreEntry,
  walkDirectoryStream,
} from './fs_utils';
import {
  OperationStreamParser,
  parseOperations,
  parseSingleOperationBlock,
} from './operation_stream_parser';
import { processDirectory } from './process_directory';
import {
  processRepository,
  processSingleFile,
  type ProcessSingleFileParams,
} from './process_repository';
import {
  buildDirectoryBatchPrompt,
  buildFileIterationPrompt,
  buildFullSystemPrompt,
  buildScalableRepositoryContext,
} from './prompts';
import {
  DEFAULT_IGNORE_LIST,
  type BackupPaths,
  type DirectoryRefactorConfig,
  type FileData,
  type FileEntry,
  type FileOperation,
  type FileOperationAction,
  type RefactorConfig,
} from './types';

export {
  DEFAULT_IGNORE_LIST,
  OperationStreamParser,
  appendOperationJsonl,
  appendRawLog,
  applyFromBackupFile,
  applyFromBackupStream,
  applyOperationsToDisk,
  buildDirectoryBatchPrompt,
  buildFileIterationPrompt,
  buildFullSystemPrompt,
  buildScalableRepositoryContext,
  executeOperationOnDisk,
  getAllFiles,
  initBackupSession,
  isPathSafe,
  parseOperations,
  parseSingleOperationBlock,
  processDirectory,
  processRepository,
  processSingleFile,
  readFileSafe,
  shouldIgnoreEntry,
  walkDirectoryStream,
  type BackupPaths,
  type DirectoryRefactorConfig,
  type FileData,
  type FileEntry,
  type FileOperation,
  type FileOperationAction,
  type ProcessSingleFileParams,
  type RefactorConfig,
};

const refactor = {
  DEFAULT_IGNORE_LIST,
  OperationStreamParser,
  appendOperationJsonl,
  appendRawLog,
  applyFromBackupFile,
  applyFromBackupStream,
  applyOperationsToDisk,
  buildDirectoryBatchPrompt,
  buildFileIterationPrompt,
  buildFullSystemPrompt,
  buildScalableRepositoryContext,
  executeOperationOnDisk,
  getAllFiles,
  initBackupSession,
  isPathSafe,
  parseOperations,
  parseSingleOperationBlock,
  processDirectory,
  processRepository,
  processSingleFile,
  readFileSafe,
  shouldIgnoreEntry,
  walkDirectoryStream,
};

export default refactor;