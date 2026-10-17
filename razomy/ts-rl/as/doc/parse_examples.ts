import * as tsRl from "@razomy/ts-rl";

export function parseExamples(text: string, ctx: tsRl.ast.HasEnterLeaveProduce) {
  const cleanText = text.replace(/^\s*\*\s?/gm, '');
  const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);
  if (!codeMatch) return { code: '', expected: '' };
  const parts = codeMatch[1].trim().split('// =>');
  return {
    code: parts[0]?.trim() || '',
    expected: parts[1]?.replace(/['"]/g, '').trim() || '',
  };
}
