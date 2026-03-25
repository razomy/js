import { FunctionDeclaration, JSDoc } from "ts-morph";

export function extractValidJsDoc(func: FunctionDeclaration, funcName: string): JSDoc {
    const jsDocs = func.getJsDocs();
    if (jsDocs.length === 0) {
    throw new Error(`[Parse Error] JSDoc is missing for function '${funcName}'`);
    }

    return jsDocs[0];
}
