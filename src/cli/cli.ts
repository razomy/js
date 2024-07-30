export async function cli(terminalArgs: string[]): Promise<number> {
  if (!terminalArgs) {
    terminalArgs = [];
  }
  console.log('razomy.js.cli start')

  const package_impl = await import('razomy.js.' + terminalArgs[0] + '/cli');
  package_impl.cli(terminalArgs.slice(1));
  return 1;
}
