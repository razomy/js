import { JSDoc } from 'ts-morph';

export function parseExamples(doc: JSDoc, funcName: string) {
  const exampleTags = doc.getTags().filter((t) => t.getTagName() === 'example');
  if (exampleTags.length === 0) {
    throw new Error(`[Parse Error] Missing @example tags in '${funcName}'`);
  }

  return exampleTags.map((tag) => {
    const cleanText = tag.getText().replace(/^\s*\*\s?/gm, '');
    const codeMatch = cleanText.match(/```[a-z]*\n([\s\S]*?)```/);

    if (!codeMatch) {
      throw new Error(`[Parse Error] Invalid @example format in '${funcName}'. Expected markdown code block (\`\`\`).`);
    }

    const rawCode = codeMatch[1].trim();
    const parts = rawCode.split('// =>');

    if (parts.length !== 2) {
      throw new Error(
        `[Parse Error] Invalid @example format in '${funcName}'. Expected '// =>' separator for expected result.`,
      );
    }

    return {
      code: parts[0].trim(),
      expected: parts[1].replace(/['"]/g, '').trim(),
    };
  });
}
