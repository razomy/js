import {assign} from "razomy.js/key/assign";

export async function cli(terminalArgs: string[]): Promise<number> {
  if (!terminalArgs) {
    terminalArgs = [];
  }
  console.log('razomy:js:cli:start')

  const rootpath = terminalArgs[0];
  const key_name = rootpath.split(assign).at(-1)!;
  const value_arguments = terminalArgs.slice(1);
  const package_impl = await import('razomy.js' + rootpath.replace(assign, '/'));
  const result = package_impl[key_name](...value_arguments);
  if(result instanceof Promise) {
    await result;
  }

  console.log('razomy:js:cli:finish')
  return result;
}
