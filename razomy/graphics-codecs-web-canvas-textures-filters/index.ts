// Imports
import { applyMask } from './apply_mask';
import { backgroundMask } from './background_mask';
import { bitSlice } from './bit_slice';
import { BlurStack, BlurTextureFilter, filterGaussBlurRgba } from './blur_stack';
import { BrightenTextureFilter } from './brighten_texture_filter';
import { byteSlice } from './byte_slice';
import { ContrastTextureFilter } from './contrast_texture_filter';
import { createCanvasElement } from './create_canvas_element';
import { dilateMask } from './dilate_mask';
import { EmbossTextureFilter } from './emboss_texture_filter';
import { Enhance_texture_filter } from './enhance_texture_filter';
import { erodeMask } from './erode_mask';
import { GrayscaleTextureFilter } from './grayscale_texture_filter';
import { HslTextureFilter } from './hsl_texture_filter';
import { HsvTextureFilter } from './hsv_texture_filter';
import type { IFilter, ITextureFilter } from './i_texture_filter';
import { InvertTextureFilter } from './invert_texture_filter';
import { KaleidoscopeTextureFilter } from './kaleidoscope_texture_filter';
import { MaskTextureFilter } from './mask_texture_filter';
import { NoiseTextureFilter } from './noise_texture_filter';
import { pixelAt } from './pixel_at';
import { PixelateTextureFilter } from './pixelate_texture_filter';
import { PosterizeTextureFilter } from './posterize_texture_filter';
import { remap } from './remap';
import { rgbDistance } from './rgb_distance';
import { rgbMean } from './rgb_mean';
import { RgbTextureFilter } from './rgb_texture_filter';
import { RgbaTextureFilter } from './rgba_texture_filter';
import { SepiaTextureFilter } from './sepia_texture_filter';
import { smoothEdgeMask } from './smooth_edge_mask';
import { SolarizeTextureFilter } from './solarize_texture_filter';
import { ThresholdTextureFilter } from './threshold_texture_filter';

// Named exports
export {
  BlurStack,
  BlurTextureFilter,
  BrightenTextureFilter,
  ContrastTextureFilter,
  EmbossTextureFilter,
  Enhance_texture_filter,
  GrayscaleTextureFilter,
  HslTextureFilter,
  HsvTextureFilter,
  InvertTextureFilter,
  KaleidoscopeTextureFilter,
  MaskTextureFilter,
  NoiseTextureFilter,
  PixelateTextureFilter,
  PosterizeTextureFilter,
  RgbTextureFilter,
  RgbaTextureFilter,
  SepiaTextureFilter,
  SolarizeTextureFilter,
  ThresholdTextureFilter,
  applyMask,
  backgroundMask,
  bitSlice,
  byteSlice,
  createCanvasElement,
  dilateMask,
  erodeMask,
  filterGaussBlurRgba,
  pixelAt,
  remap,
  rgbDistance,
  rgbMean,
  smoothEdgeMask
};
export type {
  IFilter,
  ITextureFilter
};

// Default export
const graphicsCodecsWebCanvasTexturesFilters = {
  applyMask,
  backgroundMask,
  bitSlice,
  BlurStack,
  BlurTextureFilter,
  filterGaussBlurRgba,
  BrightenTextureFilter,
  byteSlice,
  ContrastTextureFilter,
  createCanvasElement,
  dilateMask,
  EmbossTextureFilter,
  Enhance_texture_filter,
  erodeMask,
  GrayscaleTextureFilter,
  HslTextureFilter,
  HsvTextureFilter,
  InvertTextureFilter,
  KaleidoscopeTextureFilter,
  MaskTextureFilter,
  NoiseTextureFilter,
  pixelAt,
  PixelateTextureFilter,
  PosterizeTextureFilter,
  remap,
  rgbDistance,
  rgbMean,
  RgbTextureFilter,
  RgbaTextureFilter,
  SepiaTextureFilter,
  smoothEdgeMask,
  SolarizeTextureFilter,
  ThresholdTextureFilter,
};


export default graphicsCodecsWebCanvasTexturesFilters;
