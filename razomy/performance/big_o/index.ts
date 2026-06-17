// Imports
import { arrayN } from './array_n';
import { constant } from './constant';
import { exponential } from './exponential';
import { logN } from './log_n';
import { n } from './n';
import { nCubed } from './n_cubed';
import { nLogN } from './n_log_n';
import { nSquared } from './n_squared';

// Named exports
export {
  arrayN,
  constant,
  exponential,
  logN,
  n,
  nCubed,
  nLogN,
  nSquared
};

// Default export
const bigO = {
  arrayN,
  constant,
  exponential,
  logN,
  n,
  nCubed,
  nLogN,
  nSquared,
};

export default bigO;
