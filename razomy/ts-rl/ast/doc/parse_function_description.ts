import { type JSDoc } from 'ts-morph';
export function parseFunctionDescription(doc: JSDoc): string {
  const tag = doc.getTags().find((t) => t.getTagName() === 'description');
  return tag ? tag.getCommentText()?.trim() || '' : doc.getDescription().trim();
}
