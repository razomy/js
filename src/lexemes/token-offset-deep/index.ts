// Imports
import { TokenType } from './token';
import type { Token } from './token';
import { tryAligned } from './try_aligned';
import { tryScope } from './try_scope';

// Named exports
export {
  TokenType,
  tryAligned,
  tryScope
};
export type {
  Token
};

// Default export
const tokenOffsetDeep = {
  TokenType,
  tryAligned,
  tryScope,
};


export default tokenOffsetDeep;
