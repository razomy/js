// Imports
import { check } from './check';
import { create } from './create';
import { getInvalidSymlinks } from './get_invalid_symlinks';
import { InvalidLinkException } from './invalid_link_exception';

// Named exports
export {
  InvalidLinkException,
  check,
  create,
  getInvalidSymlinks
};

// Default export
const fsLink = {
  check,
  create,
  getInvalidSymlinks,
  InvalidLinkException,
};

export default fsLink;
