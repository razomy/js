import {type OnlyReadImageFileExtensionType, type ReadAndWriteImageFileExtensionType} from './types';
import * as fsFileFormat from '@razomy/fs-file-format';
import * as exceptions from "@razomy/exceptions";

export async function toImageByFormat(
  inputPath: string,
  format: ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType,
): Promise<fsFileFormat.ExtensionResult> {
  throw new exceptions.NotImplementedException();
}
