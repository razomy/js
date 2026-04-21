import * as ai from '@razomy/ai';

export function parseSwitch(text: string, options: string[]): string {
  const lowerText = text.toLowerCase();
  const optionsStr = options.map((o) => `"${o}"`).join(', ');
  const matchedOptions = options.filter((option) => lowerText.includes(option.toLowerCase()));
  if (matchedOptions.length === 0) throw new ai.TypedAnswerLlmException(text, `Exactly one of: ${optionsStr}`);
  if (matchedOptions.length > 1)
    throw new ai.TypedAnswerLlmException(text, 'Cannot contain multiple options at the same time');
  return matchedOptions[0];
}
