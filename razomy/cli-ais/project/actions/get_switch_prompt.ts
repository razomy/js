import {s} from '../llms';

export function getSwitchPrompt(options: string[]) {
    const optionsStr = options.map(o => `"${o}"`).join(', ');
    return [s(`Choose ONLY one option from the list: [${optionsStr}], or answer "panic" if none fit. Answer only with the exact text of the chosen option.`)];
}
