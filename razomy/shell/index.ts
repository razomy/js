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

export interface Shell {
  checkbox: typeof checkbox;
  confirm: typeof confirm;
  editor: typeof editor;
  expand: typeof expand;
  input: typeof input;
  number: typeof number;
  password: typeof password;
  rawlist: typeof rawlist;
  search: typeof search;
  select: typeof select;
  execute: typeof execute;
  START_DIR: typeof START_DIR;
  executeSync: typeof executeSync;
  get: typeof get;
  getBool: typeof getBool;
  log: typeof log;
  logInline: typeof logInline;
  observe: typeof observe;
  progress: typeof progress;
  tryCommand: typeof tryCommand;
  tryOrConfirm: typeof tryOrConfirm;
}

// Default export
const shell: Shell = {
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
