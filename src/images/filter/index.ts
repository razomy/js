// Imports
import { blur } from './blur';
import { emboss } from './emboss';
import { median } from './median';
import { noise } from './noise';
import { pixelate } from './pixelate';
import { sharpen } from './sharpen';
import { unsharpMask } from './unsharp_mask';

// Named exports
export {
  blur,
  emboss,
  median,
  noise,
  pixelate,
  sharpen,
  unsharpMask
};

// Default export
const filter = {
  blur,
  emboss,
  median,
  noise,
  pixelate,
  sharpen,
  unsharpMask,
};

export default filter;
