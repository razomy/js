import { FunctionDeclaration, JSDoc, type MethodDeclaration } from 'ts-morph';
import * as tsRl from "@razomy/ts-rl";

export function tryParseJsDoc(func: FunctionDeclaration | MethodDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): JSDoc | null {
  const jsDocs = func.getJsDocs();
  return jsDocs.length === 0 ? null : jsDocs[0];
}
