import { FunctionDeclaration, JSDoc } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {clearImportType} from "./clear_import_type";

export function extractParameters(func: FunctionDeclaration, doc: JSDoc, funcName: string) {
    const params = func.getParameters();
    const items = params.map((param) => {
            const name = param.getName();
            const kind = clearImportType(param.getType().getText(param));

            // Extract the default value (if it exists)
            const defaultValue = param.getInitializer()?.getText() || null;

            const paramTag = doc.getTags().find((t) => t.getTagName() === 'param' && t.getText().includes(name));
            if (!paramTag) {
              throw new Error(`[Parse Error] Missing @param documentation for parameter '${name}' in '${funcName}'`);
            }

            const comment = paramTag.getCommentText();
            const description = comment?.replace(/^-\s*/, '').trim();

            if (!description) {
              throw new Error(`[Parse Error] Empty description for @param '${name}' in '${funcName}'`);
            }

            return {
              name: name,
              kind: 'Property',
              item: {
                kind: 'Reference',
                key: kind,
              } as abstracts.ast.Reference,
              value: defaultValue
                ? {
                  kind: 'StringLiteral',
                  value: defaultValue
                } as abstracts.ast.StringLiteral
                : null,
              description,
              // defaultValue
            } satisfies abstracts.ast.Property;
          });
    return {
    kind: 'Object',
    items
    } as abstracts.ast.Object;
}
