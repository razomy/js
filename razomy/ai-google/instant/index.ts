// Imports
import { askTool } from './ask_tool';
import { specToTool } from './spec_to_tool';
import { streamWithContinuation, type StreamWithContinuationParams } from './stream_with_continuation';

// Named exports
export {
  askTool,
  specToTool,
  streamWithContinuation,
  type StreamWithContinuationParams,
};

// Default export
const instant = {
  askTool,
  specToTool,
  streamWithContinuation,
};

export default instant;