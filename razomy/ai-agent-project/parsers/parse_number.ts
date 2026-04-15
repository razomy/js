import * as ai from '@razomy/ai';

export function parseNumber(text: string): number {
  const match = text.match(/-?\d+(\.\d+)?/g);
  if (!match) throw new ai.TypedAnswerLlmException(text, 'A numeric value');
  if (match.length > 1) throw new ai.TypedAnswerLlmException(text, 'Exactly one numeric value, not multiple');
  return parseFloat(match[0]);
}
