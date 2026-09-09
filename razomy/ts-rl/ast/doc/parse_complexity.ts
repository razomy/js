import { JSDoc } from 'ts-morph';
export function parseComplexity(doc: JSDoc, funcName: string) {
  const tags = doc.getTags().filter((t) => t.getTagName() === 'complexity');
  const result = { time: '', memory: '' };
  tags.forEach((tag) => {
    const parts = tag.getCommentText()?.split(' ') || [];
    if (parts[0] === 'time') result.time = parts[1] || '';
    if (parts[0] === 'memory') result.memory = parts[1] || '';
  });
  return result;
}
