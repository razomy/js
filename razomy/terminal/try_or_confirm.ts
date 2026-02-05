import {falseThrow} from '@razomy/test';
import {executeSync} from '@razomy/shell';
import {tryCommand} from './try_command';
import {confirm} from '@inquirer/prompts';

export async function tryOrConfirm(
  message: string,
  tryCommand_: string,
  installCommand: string
) {
  if (!tryCommand(tryCommand_)) {
    falseThrow(await confirm({message: message}));
    executeSync(installCommand)
  }
}