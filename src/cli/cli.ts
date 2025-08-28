import {assign} from "razomy.js/key/assign";
import {Module, TerminalArgs} from "razomy.js/cli/module";
import {validateArrayStringThrow} from "razomy.js/cli/validateArrayStringThrow";

export async function cli<
    Rm extends keyof Module & string>(terminalArgs: TerminalArgs<Rm> | null | undefined): Promise<number> {
    terminalArgs = validateArrayStringThrow(terminalArgs, "terminalArgs")
    console.debug('razomy:js:cli:start')

    const module_key = terminalArgs[0];
    const value_arguments = terminalArgs.slice(1);
    const path_key = module_key.replace(assign, '/');
    const function_key = module_key.split(assign).at(-1)!;
    const package_impl = await import('razomy.js' + path_key) as Module;
    const result = await package_impl[function_key](...value_arguments);

    console.debug('razomy:js:cli:finish')
    return result;
}
