import {ArgumentException} from "razomy/exceptions/argument_exception";
import {String} from "razomy/string/string";

export function sub_extract_path(file_path: String, equal_path: String): String {
  const parts: string[] = file_path.split('/');
  const start_index: number = parts.indexOf(equal_path);

  if (start_index !== -1) {
    const result: string = parts.slice(start_index).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {file_path, equal_path});
  }
}

export function pre_extract_path(file_path: String, equal_path: String): String {
  const parts: string[] = file_path.split('/');
  const start_index: number = parts.indexOf(equal_path);

  if (start_index !== -1) {
    const result: string = parts.slice(0, start_index).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {file_path, equal_path});
  }
}
