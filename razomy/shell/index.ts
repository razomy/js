// Imports
import { checkbox, confirm, editor, expand, input, number, password, rawlist, search, select } from './commands';
import { execute } from './execute';
import { START_DIR, executeSync } from './execute_sync';
import type { ShellCommand, StringCommand } from './execute_sync';
import { get } from './get';
import { getBool } from './get_bool';
import { log } from './log';
import { logInline } from './log_inline';
import { observe } from './observe';
import { progress } from './progress';
import { tryCommand } from './try_command';
import { tryOrConfirm } from './try_or_confirm';

// Named exports
export {
  START_DIR,
  checkbox,
  confirm,
  editor,
  execute,
  executeSync,
  expand,
  get,
  getBool,
  input,
  log,
  logInline,
  number,
  observe,
  password,
  progress,
  rawlist,
  search,
  select,
  tryCommand,
  tryOrConfirm
};
export type {
  ShellCommand,
  StringCommand
};

// Default export
const shell = {
  checkbox,
  confirm,
  editor,
  expand,
  input,
  number,
  password,
  rawlist,
  search,
  select,
  execute,
  START_DIR,
  executeSync,
  get,
  getBool,
  log,
  logInline,
  observe,
  progress,
  tryCommand,
  tryOrConfirm,
};


export default shell;
