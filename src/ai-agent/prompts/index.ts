// Imports
import { getBoolPrompt } from './get_bool_prompt';
import { getComposePrompt } from './get_compose_prompt';
import { getDonePrompt } from './get_done_prompt';
import { getNumberPrompt } from './get_number_prompt';
import { getPanicPrompt } from './get_panic_prompt';
import { getSwitchPrompt } from './get_switch_prompt';
import { getTaskDecomposePrompt } from './get_task_decompose_prompt';

// Named exports
export {
  getBoolPrompt,
  getComposePrompt,
  getDonePrompt,
  getNumberPrompt,
  getPanicPrompt,
  getSwitchPrompt,
  getTaskDecomposePrompt
};

// Default export
const prompts = {
  getBoolPrompt,
  getComposePrompt,
  getDonePrompt,
  getNumberPrompt,
  getPanicPrompt,
  getSwitchPrompt,
  getTaskDecomposePrompt,
};

export default prompts;
