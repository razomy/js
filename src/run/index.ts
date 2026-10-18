// Imports
import type { BrowserEsmShFetchRunProvider, BrowserRunProvider, BrowserTaskProvider, RunProvider, ServerEsmShFetchRunProvider, ServerJobProvider, ServerRunProvider } from './browser_run_provider';
import { runFunctionInstant } from './run_function_instant';
import type { RunFunctionTask } from './run_function_task';
import * as server from './server';
import * as task from './task';
import { validateArrayStringThrow } from './validate_array_string_throw';

// Named exports
export {
  runFunctionInstant,
  server,
  task,
  validateArrayStringThrow
};
export type {
  BrowserEsmShFetchRunProvider,
  BrowserRunProvider,
  BrowserTaskProvider,
  RunFunctionTask,
  RunProvider,
  ServerEsmShFetchRunProvider,
  ServerJobProvider,
  ServerRunProvider
};

// Default export
const run = {
  runFunctionInstant,
  server,
  task,
  validateArrayStringThrow,
};


export default run;
