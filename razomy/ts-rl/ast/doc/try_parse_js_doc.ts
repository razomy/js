import { FunctionDeclaration, JSDoc } from 'ts-morph';
export function tryParseJsDoc(func: FunctionDeclaration): JSDoc | null {
  const jsDocs = func.getJsDocs();
  return jsDocs.length === 0 ? null : jsDocs[0];
}
