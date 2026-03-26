import * as fsFileFormat from "@razomy/fs-file-format";

/**
 * @summary Image extensions supported for both reading and writing.
 * @description Represents the file extensions of images that can be both read and written by the processing library.
 * @example
 * ```ts
 * const ext1: ReadAndWriteImageFileExtensionType = 'jpg';
 * ```
 * @example
 * ```ts
 * const ext2: ReadAndWriteImageFileExtensionType = 'webp';
 * ```
 * @example
 * ```ts
 * const ext3: ReadAndWriteImageFileExtensionType = 'png';
 * ```
 */
export type ReadAndWriteImageFileExtensionType =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'webp'
  | 'gif'
  | 'avif'
  | 'tiff'
  | 'tif'
  | 'ico'
  | 'heif'
  | 'heic';

/**
 * @summary List of writable image extensions.
 * @description An array containing all image file extensions that support writing.
 * @example
 * ```ts
 * const isSupported = imageWriteTargets.includes('jpg'); // => true
 * ```
 * @example
 * ```ts
 * const isSupported = imageWriteTargets.includes('svg' as any); // => false
 * ```
 * @example
 * ```ts
 * const writableCount = imageWriteTargets.length; // => 11
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export const IMAGE_WRITE_TARGETS: ReadAndWriteImageFileExtensionType[] = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'avif',
  'tiff',
  'tif',
  'ico',
  'heif',
  'heic',
];

/**
 * @summary Image extensions supported only for reading.
 * @description Represents the file extensions of images that can be read but not directly written without conversion.
 * @example
 * ```ts
 * const ext1: OnlyReadImageFileExtensionType = 'svg';
 * ```
 * @example
 * ```ts
 * const ext2: OnlyReadImageFileExtensionType = 'bmp';
 * ```
 * @example
 * ```ts
 * const isReadOnly = (ext: OnlyReadImageFileExtensionType) => true;
 * ```
 */
export type OnlyReadImageFileExtensionType = 'svg' | 'bmp';

/**
 * @summary All supported image extensions.
 * @description A union of both read-write and read-only image file extension types.
 * @example
 * ```ts
 * const ext1: AllImageFileExtensionType = 'svg';
 * ```
 * @example
 * ```ts
 * const ext2: AllImageFileExtensionType = 'jpg';
 * ```
 * @example
 * ```ts
 * const ext3: AllImageFileExtensionType = 'avif';
 * ```
 */
export type AllImageFileExtensionType = ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType;

/**
 * @summary Image format metadata definition.
 * @description Extends the standard FileFormat with a strongly typed file extension specific to images.
 * @example
 * ```ts
 * const format: ImageFormat = images[0];
 * ```
 * @example
 * ```ts
 * const ext = format.fileExtensionType; // => 'jpg'
 * ```
 * @example
 * ```ts
 * const isImage = format.fileCategory === 'image'; // => true
 * ```
 */
export type ImageFormat = fsFileFormat.FileFormat & {
  readonly fileExtensionType: AllImageFileExtensionType;
};

function getConversions(currentExt: ReadAndWriteImageFileExtensionType): ReadAndWriteImageFileExtensionType[] {
  return IMAGE_WRITE_TARGETS.filter((target) => target !== currentExt);
}

/**
 * @summary List of supported image formats metadata.
 * @description Contains metadata for various image formats including media type, icon, category, and possible format conversions.
 * @example
 * ```ts
 * const jpgFormat = images.find(img => img.fileExtensionType === 'jpg');
 * ```
 * @example
 * ```ts
 * const pngMediaType = images.find(img => img.fileExtensionType === 'png')?.mediaType; // => 'image/png'
 * ```
 * @example
 * ```ts
 * const svgConversions = images.find(img => img.fileExtensionType === 'svg')?.conversions;
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export const IMAGES: readonly ImageFormat[] = [
  {
    fileExtensionType: 'jpg',
    mediaType: 'image/jpeg',
    fileCategory: 'image',
    iconUrl: 'mdi-file-image',
    conversions: getConversions('jpg'),
  },
  {
    fileExtensionType: 'jpeg',
    mediaType: 'image/jpeg',
    fileCategory: 'image',
    iconUrl: 'mdi-file-image',
    conversions: getConversions('jpeg'),
  },
  {
    fileExtensionType: 'png',
    mediaType: 'image/png',
    fileCategory: 'image',
    iconUrl: 'mdi-file-image',
    conversions: getConversions('png'),
  },
  {
    fileExtensionType: 'webp',
    mediaType: 'image/webp',
    fileCategory: 'image',
    iconUrl: 'mdi-file-image',
    conversions: getConversions('webp'),
  },
  {
    fileExtensionType: 'gif',
    mediaType: 'image/gif',
    fileCategory: 'image',
    iconUrl: 'mdi-file-gif-box',
    conversions: getConversions('gif'),
  },
  {
    fileExtensionType: 'avif',
    mediaType: 'image/avif',
    fileCategory: 'image',
    iconUrl: 'mdi-star-face',
    conversions: getConversions('avif'),
  },
  // TODO: not working {fileExtensionType: 'heic', mediaType: 'image/heic', fileCategory: 'image', icon: 'mdi-cellphone', conversions: getConversions('heic')},
  // TODO: not working {fileExtensionType: 'heif', mediaType: 'image/heif', fileCategory: 'image', icon: 'mdi-cellphone', conversions: getConversions('heif')},
  {
    fileExtensionType: 'tiff',
    mediaType: 'image/tiff',
    fileCategory: 'image',
    iconUrl: 'mdi-printer',
    conversions: getConversions('tiff'),
  },
  {
    fileExtensionType: 'tif',
    mediaType: 'image/tiff',
    fileCategory: 'image',
    iconUrl: 'mdi-printer',
    conversions: getConversions('tif'),
  },
  {
    fileExtensionType: 'ico',
    mediaType: 'image/x-icon',
    fileCategory: 'image',
    iconUrl: 'mdi-emoticon',
    conversions: getConversions('ico'),
  },
  {
    fileExtensionType: 'svg',
    mediaType: 'image/svg+xml',
    fileCategory: 'image',
    iconUrl: 'mdi-vector-curve',
    conversions: IMAGE_WRITE_TARGETS,
  },
  {
    fileExtensionType: 'bmp',
    mediaType: 'image/bmp',
    fileCategory: 'image',
    iconUrl: 'mdi-image-filter-black-white',
    conversions: IMAGE_WRITE_TARGETS,
  },
];
