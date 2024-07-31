export async function cli(terminalArgs: string[]): Promise<number> {
  if (!terminalArgs) {
    terminalArgs = [];
  }
  console.log('razomy.js.cli start')

  const rootpath = terminalArgs[0];
  const key_name = terminalArgs[1];
  const value_arguments = terminalArgs.slice(2);
  const package_impl = await import('razomy.js' + rootpath);
  const result = await package_impl[key_name](...value_arguments);

  console.log('razomy.js.cli finish')
  return result;
}
