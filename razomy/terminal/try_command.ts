import * as shell from "@razomy/shell";

export function tryCommand(commandName: string) {
  try {
    const result = shell.executeSync(commandName);
    return result !== '';
  } catch (e) {
    return false;
  }
}
