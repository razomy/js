import {toFormattedString} from './to_formatted_string';
import {objectToBytes} from './object_to_bytes';

export function objectToFormattedString(obj: unknown): string {
  const sizeInBytes = objectToBytes(obj);
  const formattedSize = toFormattedString(sizeInBytes);
  return formattedSize;
}
