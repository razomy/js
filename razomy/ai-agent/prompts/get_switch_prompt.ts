import * as ais from '@razomy/ais';

export function getSwitchPrompt(options: string[]) {
  const optionsStr = options.map((o) => `"${o}"`).join(', ');
  return [
    ais.chats.sM(
      `Choose ONLY one option from the list: [${optionsStr}], or answer "PANIC" if none fit. Answer only with the exact text of the chosen option.`,
    ),
  ];
}
