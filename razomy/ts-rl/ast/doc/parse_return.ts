import { JSDoc } from 'ts-morph';
export function parseReturn(doc: JSDoc, funcName: string): string {
  const tag = doc.getTags().find((t) => t.getTagName() === 'returns');
  return tag?.getCommentText()?.trim() || '';
}
