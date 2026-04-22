import * as dict from '@razomy/dict';

export function getPath(obj, path: string) {
  if (path === '') {
    return [];
  }

  const closingBracketIndex = path.indexOf(dict.ASSIGN);
  const slug = path.substring(0, closingBracketIndex);
  const childNode = Object.keys(obj).find((key) => key === slug);
  if (!childNode) {
    throw new Error(`Node not found path="${path}".`);
  }

  const remainingString = path.substring(closingBracketIndex + 1);
  return [childNode, ...getPath(childNode, remainingString)];
}
