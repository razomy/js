import * as shell from "@razomy/shell";

export interface Shell {
  checkbox: typeof shell.checkbox;
  confirm: typeof shell.confirm;
  editor: typeof shell.editor;
  expand: typeof shell.expand;
  input: typeof shell.input;
  number: typeof shell.number;
  password: typeof shell.password;
  rawlist: typeof shell.rawlist;
  search: typeof shell.search;
  select: typeof shell.select;
  execute: typeof shell.execute;
  executeSync: typeof shell.executeSync;
  get: typeof shell.get;
  getBool: typeof shell.getBool;
  log: typeof shell.log;
  logInline: typeof shell.logInline;
  observe: typeof shell.observe;
  progress: typeof shell.progress;
  tryCommand: typeof shell.tryCommand;
  tryOrConfirm: typeof shell.tryOrConfirm;
  tryExecuteSync: typeof shell.tryExecuteSync;
}
