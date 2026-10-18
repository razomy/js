// Imports
import { appendOperationJsonl } from './append_operation_jsonl';
import { appendRawLog } from './append_raw_log';
import { applyFromBackupFile } from './apply_from_backup_file';
import { applyFromBackupStream } from './apply_from_backup_stream';
import { applyOperationsToDisk } from './apply_operations_to_disk';
import { buildDirectoryBatchPrompt } from './build_directory_batch_prompt';
import { buildFileIterationPrompt } from './build_file_iteration_prompt';
import { buildFullSystemPrompt } from './build_full_system_prompt';
import { buildScalableRepositoryContext } from './build_scalable_repository_context';
import { executeOperationOnDisk } from './execute_operation_on_disk';
import { DEFAULT_IGNORE_LIST } from './file_entry';
import type { BackupPaths, DirectoryRefactorConfig, FileData, FileEntry, FileOperation, FileOperationAction, RefactorConfig } from './file_entry';
import { getAllFiles } from './get_all_files';
import { initBackupSession } from './init_backup_session';
import { isPathSafe } from './is_path_safe';
import { OperationStreamParser } from './operation_stream_parser';
import { parseOperations } from './parse_operations';
import { parseSingleOperationBlock } from './parse_single_operation_block';
import { processDirectory } from './process_directory';
import { processRepository } from './process_repository';
import type { ProcessSingleFileParams } from './process_repository';
import { processSingleFile } from './process_single_file';
import { readFileSafe } from './read_file_safe';
import { shouldIgnoreEntry } from './should_ignore_entry';
import { walkDirectoryStream } from './walk_directory_stream';

// Named exports
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
  walkDirectoryStream
};
export type {
  BackupPaths,
  DirectoryRefactorConfig,
  FileData,
  FileEntry,
  FileOperation,
  FileOperationAction,
  ProcessSingleFileParams,
  RefactorConfig
};

// Default export
const refactor = {
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
  DEFAULT_IGNORE_LIST,
  getAllFiles,
  initBackupSession,
  isPathSafe,
  OperationStreamParser,
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
