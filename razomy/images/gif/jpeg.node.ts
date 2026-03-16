import { toImageByFormat } from '../to_image_by_format.node';
import type * as fsFileFormat from '@razomy/fs-file-format';

/**
 * Convert from GIF to JPEG
 */
export async function jpeg(inputPath: string): Promise<fsFileFormat.ExtensionResult> {
    return await toImageByFormat(inputPath, 'jpeg');
}
