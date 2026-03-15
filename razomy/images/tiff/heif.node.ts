import { toImageByFormat } from '../to_image_by_format.node';
import type * as fsFileFormat from '@razomy/fs-file-format';

/**
 * Convert from TIFF to HEIF
 */
export async function heif(inputPath: string): Promise<fsFileFormat.ExtensionResult> {
    return await toImageByFormat(inputPath, 'heif');
}
