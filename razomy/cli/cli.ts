import {Module, TerminalArgs} from 'razomy.cli/module';
import {validateArrayStringThrow} from 'razomy.cli/validate_array_string_throw';

export async function cli<
  Rm extends keyof Module & string>(terminalArgs: TerminalArgs<Rm> | null | undefined): Promise<number> {
  terminalArgs = validateArrayStringThrow(terminalArgs, 'terminalArgs')
  console.debug('razomy:js:cli:start')

  const moduleKeyAndFunctionKey = terminalArgs[0].split('/');
  const valueArguments = terminalArgs.slice(1);
  const moduleKey = moduleKeyAndFunctionKey.join('/');
  const functionKey = moduleKeyAndFunctionKey.slice(-1).join('/');
  const packageImpl = await import('razomy' + moduleKey) as Module;
  const result = await packageImpl[functionKey](...valueArguments);

  console.debug('razomy:js:cli:finish')
  return result;
}

// cli('/console/log text'.split(' ')).then();
// razomy /console/log text

