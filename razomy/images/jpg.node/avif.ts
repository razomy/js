import { toImageByFormat } from '../to_image_by_format.node';
import type * as fsFileFormat from '@razomy/fs-file-format';

/**
 * Convert from JPG to AVIF
 */
export async function avif(inputPath: string): Promise<fsFileFormat.ExtensionResult> {
    return await toImageByFormat(inputPath, 'avif');
}
