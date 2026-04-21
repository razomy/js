import * as ai from '@razomy/ai';

export function parseArray(text: string): string[] {
  const jsonMatch = text.match(/\[.*]/s);
  if (!jsonMatch) throw new ai.TypedAnswerLlmException(text, 'A valid JSON array pattern');
  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new ai.TypedAnswerLlmException(text, 'Parsable JSON string');
  }

  if (!Array.isArray(parsed)) {
    throw new ai.TypedAnswerLlmException(text, 'JSON array, not an object');
  }

  return parsed;
}
