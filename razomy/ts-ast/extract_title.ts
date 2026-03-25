import { JSDoc } from "ts-morph";

export function extractTitle(doc: JSDoc, funcName: string,): string {
    const titleTag = doc.getTags().find((t) => t.getTagName() === 'summary');
    const title = titleTag?.getCommentText()?.trim();
    if (!title) {
    throw new Error(`[Parse Error] Missing or empty @summary in '${funcName}`);
    }

    return title;
}
