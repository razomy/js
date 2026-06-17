// Imports
import { askBool } from './ask_bool';
import { askCompose } from './ask_compose';
import { askJson } from './ask_json';
import { askNumber } from './ask_number';
import { askSwitch } from './ask_switch';
import { askTaskDecompose } from './ask_task_decompose';

// Named exports
export {
  askBool,
  askCompose,
  askJson,
  askNumber,
  askSwitch,
  askTaskDecompose
};

// Default export
const actions = {
  askBool,
  askCompose,
  askJson,
  askNumber,
  askSwitch,
  askTaskDecompose,
};

export default actions;
