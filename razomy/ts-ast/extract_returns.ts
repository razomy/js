import { FunctionDeclaration, JSDoc } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {clearImportType} from "./clear_import_type";

export function extractReturns(func: FunctionDeclaration, doc: JSDoc, funcName: string) {
    const kind = clearImportType(func.getReturnType().getText(func));
    const returnsTag = doc.getTags().find((t) => t.getTagName() === 'returns');
    if (!returnsTag) {
    throw new Error(`[Parse Error] Missing @returns tag in '${funcName}'`);
    }

    const description = returnsTag
            .getText()
            .replace(/@returns\s*/, '')
            .replace(/^\s*\*\s?/gm, '')
            .trim();
    if (!description) {
    throw new Error(`[Parse Error] Empty description for @returns in '${funcName}'`);
    }

    return {
    kind: 'Reference',
    key: kind,
    description,
    } as abstracts.ast.Reference;
}
