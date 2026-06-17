// Imports
import { addAlpha } from './add_alpha';
import { brightness } from './brightness';
import { contrast } from './contrast';
import { extractChannel } from './extract_channel';
import { gamma } from './gamma';
import { grayscale } from './grayscale';
import { invert } from './invert';
import { normalize } from './normalize';
import { removeAlpha } from './remove_alpha';
import { sepia } from './sepia';
import { toColorspace } from './to_colorspace';

// Named exports
export {
  addAlpha,
  brightness,
  contrast,
  extractChannel,
  gamma,
  grayscale,
  invert,
  normalize,
  removeAlpha,
  sepia,
  toColorspace
};

// Default export
const color = {
  addAlpha,
  brightness,
  contrast,
  extractChannel,
  gamma,
  grayscale,
  invert,
  normalize,
  removeAlpha,
  sepia,
  toColorspace,
};

export default color;
