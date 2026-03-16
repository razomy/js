import { toImageByFormat } from '../to_image_by_format.node';
import type * as fsFileFormat from '@razomy/fs-file-format';

/**
 * Convert from WEBP to JPG
 */
export async function jpg(inputPath: string): Promise<fsFileFormat.ExtensionResult> {
    return await toImageByFormat(inputPath, 'jpg');
}
