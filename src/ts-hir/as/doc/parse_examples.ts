import * as abstractions from "@razomy/abstractions";

export function parseExamples(text: string, ctx: abstractions.patterns.HasEnterLeave) {
  const cleanText = text.replace(/^\s*\*\s?/gm, '');
  const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);
  if (!codeMatch) return { code: '', expected: '' };
  const parts = codeMatch[1].trim().split('// =>');
  return {
    code: parts[0]?.trim() || '',
    expected: parts[1]?.replace(/['"]/g, '').trim() || '',
  };
}
