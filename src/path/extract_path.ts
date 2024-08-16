import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export function sub_extract_path(file_path: string, equal_path: string): string {
  const parts: string[] = file_path.split('/');
  const startIndex: number = parts.indexOf(equal_path);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {file_path, equal_path});
  }
}

export function pre_extract_path(file_path: string, equal_path: string): string {
  const parts: string[] = file_path.split('/');
  const startIndex: number = parts.indexOf(equal_path);

  if (startIndex !== -1) {
    const result: string = parts.slice(0, startIndex).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {file_path, equal_path});
  }
}
