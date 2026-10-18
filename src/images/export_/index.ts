// Imports
import { avif } from './avif';
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
  IMAGES,
  IMAGE_WRITE_TARGETS,
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
