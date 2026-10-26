/**
 * Константы libvips (эквиваленты C-enum'ов).
 * Заданы статически, так как в wasm-vips они недоступны через статический импорт.
 */

export const FOREIGN_KEEP = {
  none: 0,
  exif: 1,
  xmp: 2,
  iptc: 4,
  icc: 8,
  other: 16,
  all: 31,
} as const;

export const FOREIGN_SUBSAMPLE = {
  auto: 0,
  on: 1,
  off: 2,
} as const;

export const FOREIGN_HEIF_COMPRESSION = {
  hevc: 1,
  avc: 2,
  jpeg: 3,
  av1: 4,
} as const;

export const SIZE = {
  both: 0,
  up: 1,
  down: 2,
  force: 3,
} as const;

export const FOREIGN_TIFF_COMPRESSION = {
  none: 0,
  jpeg: 1,
  deflate: 2,
  packbits: 3,
  ccittfax4: 4,
  lzw: 5,
  webp: 6,
  zstd: 7,
  jp2k: 8,
} as const;
