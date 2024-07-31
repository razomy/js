export async function cli(terminalArgs: string[]): Promise<number> {
  if (!terminalArgs) {
    terminalArgs = [];
  }
  console.log('razomy.js.cli start')

  const package_impl = await import('razomy.js.' + terminalArgs[0]);
  package_impl[terminalArgs[1]](terminalArgs.slice(1));

  console.log('razomy.js.cli finish')
  return 1;
}
