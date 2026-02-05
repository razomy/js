import {executeSync} from '@razomy/shell';

export function tryCommand(commandName: string) {
  try {
    const result = executeSync(commandName)
    return result !== '';
  } catch (e) {
    return false;
  }
}


