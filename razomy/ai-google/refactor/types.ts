export const DEFAULT_IGNORE_LIST = [
  'node_modules',
  '.gitignore',
  '.git',
  '.idea',
  'dist',
  '.meta',
  'build',
  '.env',
  'package-lock.json',
  '.gemini-backups',
];

export interface FileEntry {
  fullPath: string;
  relativePath: string;
}

export interface FileData {
  relativePath: string;
  content: string;
}

export type FileOperationAction = 'create' | 'update' | 'delete' | 'noop';

export interface FileOperation {
  action: FileOperationAction;
  path: string;
  content: string;
  reason: string;
}

export interface BackupPaths {
  dir: string;
  rawLogPath: string;
  jsonlOpsPath: string;
  jsonSnapshotPath?: string;
}

export interface RefactorConfig {
  targetDir: string;
  /** Системный промпт */
  systemPrompt: string;
  /** Глобальная задача для каждого файла */
  taskPrompt: string;
  model?: string;
  ignoreList?: string[];
  applyImmediately?: boolean;
  cleanupCacheAfterRun?: boolean;
  /** Максимальное число авто-догенераций, если ответ превышает лимит выходных токенов */
  maxContinuationTurns?: number;
  /** Максимальное число файлов, чье полное содержимое попадет в стартовый кэш */
  maxFullFilesInCache?: number;
  /** Папка для хранения бэкапов и логов относительно targetDir */
  backupDirName?: string;
}

export interface DirectoryRefactorConfig {
  targetDir: string;
  taskPrompt: string;
  systemPrompt?: string;
  model?: string;
  ignoreList?: string[];
  temperature?: number;
  maxOutputTokens?: number;
  maxTurns?: number;
  backupDirName?: string;
  applyChanges?: boolean;
}