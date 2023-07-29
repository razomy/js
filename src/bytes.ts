import sizeof from 'object-sizeof';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getObjectSizeInBytes(obj: any): number {
  return sizeof(obj);
}

export function formattedSizeSizeInBytes(obj: unknown): string {
  const sizeInBytes = getObjectSizeInBytes(obj);
  const formattedSize = formatBytes(sizeInBytes);
  return formattedSize;
}

