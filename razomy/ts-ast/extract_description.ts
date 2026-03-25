import { JSDoc } from "ts-morph";

export function extractDescription(doc: JSDoc, funcName: string): string {
    const descTag = doc.getTags().find((t) => t.getTagName() === 'description');
    const description = descTag
            ? descTag.getCommentText()?.trim()
            : doc.getDescription().trim();
    if (!description) {
    throw new Error(`[Parse Error] Missing description for '${funcName}'`);
    }

    return description;
}
