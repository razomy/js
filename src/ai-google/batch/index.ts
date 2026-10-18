// Imports
import { askAtFiles } from './ask_at_files';
import { asks } from './asks';
import { asksWithCache } from './asks_with_cache';
import { cancel } from './cancel';
import { delete_ } from './delete_';
import { get } from './get';
import { getResult } from './get_result';
import { PRICES, printPrice } from './print_price';
import { wait } from './wait';

// Named exports
export {
  PRICES,
  askAtFiles,
  asks,
  asksWithCache,
  cancel,
  delete_,
  get,
  getResult,
  printPrice,
  wait
};

// Default export
const batch = {
  askAtFiles,
  asks,
  asksWithCache,
  cancel,
  delete_,
  get,
  getResult,
  PRICES,
  printPrice,
  wait,
};

export default batch;
