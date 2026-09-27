import { FunctionDeclaration, JSDoc, type MethodDeclaration } from 'ts-morph';
export function tryParseJsDoc(func: FunctionDeclaration | MethodDeclaration): JSDoc | null {
  const jsDocs = func.getJsDocs();
  return jsDocs.length === 0 ? null : jsDocs[0];
}
