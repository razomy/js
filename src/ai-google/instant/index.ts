// Imports
import { askTool } from './ask_tool';
import { specToTool } from './spec_to_tool';
import { streamWithContinuation } from './stream_with_continuation';
import type { StreamWithContinuationParams } from './stream_with_continuation';

// Named exports
export {
  askTool,
  specToTool,
  streamWithContinuation
};
export type {
  StreamWithContinuationParams
};

// Default export
const instant = {
  askTool,
  specToTool,
  streamWithContinuation,
};


export default instant;
