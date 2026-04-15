import * as object_ from '@razomy/object';

export function objectToFormattedString(obj: unknown): string {
  const sizeInBytes = object_.objectToBytes(obj);
  const formattedSize = object_.toFormattedString(sizeInBytes);
  return formattedSize;
}
