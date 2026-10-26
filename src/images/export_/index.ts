// Imports
import { avif } from './avif';
import { FOREIGN_HEIF_COMPRESSION, FOREIGN_KEEP, FOREIGN_SUBSAMPLE, FOREIGN_TIFF_COMPRESSION, SIZE } from './constants';
import { gif } from './gif';
import { heic } from './heic';
import { ico } from './ico';
import { jpeg } from './jpeg';
import { png } from './png';
import { tiff } from './tiff';
import { IMAGES, IMAGE_WRITE_TARGETS } from './types';
import type { AllImageFileExtensionType, ImageFormat, OnlyReadImageFileExtensionType, ReadAndWriteImageFileExtensionType } from './types';
import { webp } from './webp';

// Named exports
export {
  FOREIGN_HEIF_COMPRESSION,
  FOREIGN_KEEP,
  FOREIGN_SUBSAMPLE,
  FOREIGN_TIFF_COMPRESSION,
  IMAGES,
  IMAGE_WRITE_TARGETS,
  SIZE,
  avif,
  gif,
  heic,
  ico,
  jpeg,
  png,
  tiff,
  webp
};
export type {
  AllImageFileExtensionType,
  ImageFormat,
  OnlyReadImageFileExtensionType,
  ReadAndWriteImageFileExtensionType
};

// Default export
const export_ = {
  avif,
  FOREIGN_HEIF_COMPRESSION,
  FOREIGN_KEEP,
  FOREIGN_SUBSAMPLE,
  FOREIGN_TIFF_COMPRESSION,
  SIZE,
  gif,
  heic,
  ico,
  jpeg,
  png,
  tiff,
  IMAGES,
  IMAGE_WRITE_TARGETS,
  webp,
};


export default export_;
