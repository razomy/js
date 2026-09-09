import { JSDoc } from 'ts-morph';
export function parseExamples(doc: JSDoc, funcName: string) {
  const exampleTags = doc.getTags().filter((t) => t.getTagName() === 'example');
  return exampleTags.map((tag) => {
    const cleanText = tag.getText().replace(/^\s*\*\s?/gm, '');
    const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);
    if (!codeMatch) return { code: '', expected: '' };
    const parts = codeMatch[1].trim().split('// =>');
    return { code: parts[0]?.trim() || '', expected: parts[1]?.replace(/['"]/g, '').trim() || '' };
  });
}
