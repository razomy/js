// Imports
import { callAuto } from './call_auto';
import { callText } from './call_text';
import { callTool } from './call_tool';
import { consensusCall } from './consensus_call';

// Named exports
export {
  callAuto,
  callText,
  callTool,
  consensusCall
};

// Default export
const llms = {
  callAuto,
  callText,
  callTool,
  consensusCall,
};

export default llms;
