// Imports
import { crop } from './crop';
import { extend } from './extend';
import { flip } from './flip';
import { resize } from './resize';
import { rotate } from './rotate';
import { smartCrop } from './smart_crop';
import { thumbnail } from './thumbnail';
import { trim } from './trim';

// Named exports
export {
  crop,
  extend,
  flip,
  resize,
  rotate,
  smartCrop,
  thumbnail,
  trim
};

// Default export
const geometry = {
  crop,
  extend,
  flip,
  resize,
  rotate,
  smartCrop,
  thumbnail,
  trim,
};

export default geometry;
