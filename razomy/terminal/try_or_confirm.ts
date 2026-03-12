import { tryCommand } from './try_command';
import { confirm } from '@inquirer/prompts';
import * as test from '@razomy/test';
import * as shell from '@razomy/shell';

export async function tryOrConfirm(message: string, tryCommand_: string, installCommand: string) {
  if (!tryCommand(tryCommand_)) {
    test.falseThrow(await confirm({ message: message }));
    shell.executeSync(installCommand);
  }
}
