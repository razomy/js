import { FunctionDeclaration, JSDoc, type MethodDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";

export function tryParseJsDoc(func: FunctionDeclaration | MethodDeclaration, ctx: abstractions.patterns.HasEnterLeave): JSDoc | null {
  const jsDocs = func.getJsDocs();
  return jsDocs.length === 0 ? null : jsDocs[0];
}
