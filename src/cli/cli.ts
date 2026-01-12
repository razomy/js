import {assign} from 'razomy/key/assign';
import {Module, TerminalArgs} from 'razomy/cli/module';
import validate_array_string_throw from 'razomy/cli/validate_array_string_throw';

async function cli<
  Rm extends keyof Module & string>(terminalArgs: TerminalArgs<Rm> | null | undefined): Promise<number> {
  terminalArgs = validate_array_string_throw(terminalArgs, 'terminalArgs')
  console.debug('razomy:js:cli:start')

  const module_key_and_function_key = terminalArgs[0].split("/");
  const value_arguments = terminalArgs.slice(1);
  const module_key = module_key_and_function_key.join('/');
  const function_key = module_key_and_function_key.slice(-1).join('/');
  const package_impl = await import('razomy' + module_key) as Module;
  const result = await package_impl[function_key](...value_arguments);

  console.debug('razomy:js:cli:finish')
  return result;
}

// cli('/console/log text'.split(' ')).then();
// razomy /console/log text
export default cli;
