import { FunctionDeclaration, JSDoc } from 'ts-morph';

export function tryParseJsDoc(func: FunctionDeclaration): JSDoc | null {
  const jsDocs = func.getJsDocs();
  if (jsDocs.length === 0) {
    return null;
  }

  return jsDocs[0];
}
