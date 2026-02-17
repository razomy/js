import {type FileFormat} from '@razomy/fs-file-format';

export const documents: FileFormat[] = [
  {fileExtensionType: 'pdf', mediaType: 'application/pdf', fileCategory: 'document', iconUrl: 'mdi-file-pdf-box', conversions: ['docx', 'jpg', 'png']},
  {
    fileExtensionType: 'docx',
    mediaType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileCategory: 'document',
    iconUrl: 'mdi-file-word',
    conversions: ['pdf', 'txt', 'html']
  },
  {fileExtensionType: 'html', mediaType: 'text/html', fileCategory: 'document', iconUrl: 'mdi-language-html5', conversions: ['pdf', 'txt']},
  {fileExtensionType: 'txt', mediaType: 'text/plain', fileCategory: 'document', iconUrl: 'mdi-file-document-text', conversions: ['pdf', 'docx']},
  {fileExtensionType: 'csv', mediaType: 'text/csv', fileCategory: 'document', iconUrl: 'mdi-file-table', conversions: ['xlsx', 'pdf', 'txt']},
  {
    fileExtensionType: 'xlsx',
    mediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileCategory: 'document',
    iconUrl: 'mdi-file-excel',
    conversions: ['csv', 'pdf']
  },
] as const;