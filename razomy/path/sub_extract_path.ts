import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {String} from 'razomy.string/string';

export function subExtractPath(filePath: String, equalPath: String): String {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(equalPath);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {filePath, equalPath});
  }
}
