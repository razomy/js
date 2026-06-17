// Imports
import { TokenType } from './cursor';
import type { Token } from './cursor';
import { tryAligned } from './try_aligned';
import type { HasDeep, HasStack } from './try_aligned';
import { tryScope } from './try_scope';

// Named exports
export {
  TokenType,
  tryAligned,
  tryScope
};
export type {
  HasDeep,
  HasStack,
  Token
};

// Default export
const tokenOffsetDeep = {
  TokenType,
  tryAligned,
  tryScope,
};


export default tokenOffsetDeep;
