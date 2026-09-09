import { JSDoc } from 'ts-morph';
export function parseTitle(doc: JSDoc, funcName: string): string {
  const tag = doc.getTags().find((t) => t.getTagName() === 'summary');
  return tag?.getCommentText()?.trim() || '';
}
