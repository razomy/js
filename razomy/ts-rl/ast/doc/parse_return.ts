import { JSDoc } from 'ts-morph';

export function parseReturn(doc: JSDoc, funcName: string): string {
  const titleTag = doc.getTags().find((t) => t.getTagName() === 'returns');
  const title = titleTag?.getCommentText()?.trim();
  if (!title) {
    throw new Error(`[Parse Error] Missing or empty @returns in '${funcName}`);
  }

  return title;
}
