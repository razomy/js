import sizeof from 'object-sizeof';

export function format_bytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function get_object_size_in_bytes(obj: any): number {
  return sizeof(obj);
}

export function formatted_size_in_bytes(obj: unknown): string {
  const size_in_bytes = get_object_size_in_bytes(obj);
  const formatted_size = format_bytes(size_in_bytes);
  return formatted_size;
}
