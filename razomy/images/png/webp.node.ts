import { toImageByFormat } from '../to_image_by_format.node';
import type * as fsFileFormat from '@razomy/fs-file-format';

/**
 * Convert from PNG to WEBP
 */
export async function webp(inputPath: string): Promise<fsFileFormat.ExtensionResult> {
    return await toImageByFormat(inputPath, 'webp');
}
