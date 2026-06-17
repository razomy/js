// Imports
import { downloadFile } from './download_file';
import { CloudFileStore, downloadFileRecursiveFile } from './download_file_recursive_file';
import { downloadFilesFromStorage } from './download_files_from_storage';
import { downloadFilesRecursive } from './download_files_recursive';
import { exportFiles } from './export_files';
import { uploadFile } from './upload_file';
import { uploadFilesRecursive } from './upload_files_recursive';
import { uploadFilesToStorage } from './upload_files_to_storage';

// Named exports
export {
  CloudFileStore,
  downloadFile,
  downloadFileRecursiveFile,
  downloadFilesFromStorage,
  downloadFilesRecursive,
  exportFiles,
  uploadFile,
  uploadFilesRecursive,
  uploadFilesToStorage
};

// Default export
const storageGoogle = {
  downloadFile,
  CloudFileStore,
  downloadFileRecursiveFile,
  downloadFilesFromStorage,
  downloadFilesRecursive,
  exportFiles,
  uploadFile,
  uploadFilesRecursive,
  uploadFilesToStorage,
};

export default storageGoogle;
