import { confirm } from '@inquirer/prompts';
import * as test from '@razomy/test';
import * as shell from '@razomy/shell';
import * as shell_ from '@razomy/shell';

export async function tryOrConfirm(message: string, tryCommand: string, installCommand: string) {
  if (!shell_.tryCommand(tryCommand)) {
    test.falseThrow(await confirm({ message: message }));
    shell.executeSync(installCommand);
  }
}
