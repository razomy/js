// doc-parser.ts
import { JSDoc, JSDocTag, JSDocText, Node, SyntaxKind } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

/**
 * Парсит JSDoc узел ts-morph в DocsAsn
 */
export function parseJsDoc(jsDoc: JSDoc, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.DocsAsn {
  const block: (abstractions.translators.TextAsn | abstractions.translators.TagAsn)[] = [];

  // Дочерние узлы JSDoc в AST TypeScript
  // jsDoc.getChildren() возвращает синтаксические узлы: JSDocComment, JSDocTag, etc.
  const children = jsDoc.getChildren() as (JSDocTag | JSDocText)[];

  for (const child of children) {
    // Если это тег (например, JSDocParameterTag, JSDocReturnTag или просто JSDocTag)
    if (Node.isJSDocTag(child)) {
      const name = child.getTagName();

      if (name === 'summary') {
        block.push({
          kind: 'TagAsn',
          identifier: {
            name: 'title',
          },
          syntaxRole: 'text',
          value: {
            kind: 'LiteralAsn',
            value: child.getCommentText()?.trim() ?? '',
            syntaxRole: 'text',
            semanticLayer: 'state',
          },
        });
      } else if (name === 'example') {
        const example = tsRl.ast.doc.parseExamples(child.getCommentText()?.trim()!, ctx);

        block.push({
          kind: 'TagAsn',
          identifier: {
            name: child.getTagName(),
          },
          syntaxRole: 'text',
          value: {
            kind: 'BlockAsn',
            syntaxRole: 'text',
            statements: [
              {
                kind: 'LiteralAsn',
                value: example.code,
                syntaxRole: 'text',
                semanticLayer: 'state',
              },
              {
                kind: 'LiteralAsn',
                value: example.code,
                syntaxRole: 'text',
                semanticLayer: 'state',
              },
            ],
          },
        });
      } else {
        block.push({
          kind: 'TagAsn',
          identifier: {
            name: child.getTagName(),
          },
          syntaxRole: 'text',
          value: {
            kind: 'LiteralAsn',
            value: child.getCommentText()?.trim() ?? '',
            syntaxRole: 'text',
            semanticLayer: 'state',
          },
        });
      }
    }
    // Если это текстовая часть (в ts-morph это может быть SyntaxList или JSDocText)
    else if (child.getKind() === SyntaxKind.JSDocText || child.getKind() === SyntaxKind.JSDocComment) {
      const value = child.getText().trim();
      if (value) {
        block.push({
          kind: 'TextAsn',
          value: {
            kind: 'LiteralAsn',
            value,
            syntaxRole: 'text',
            semanticLayer: 'state',
          },
          syntaxRole: 'text',
        });
      }
    }
  }

  return {
    kind: 'DocsAsn',
    block,
    syntaxRole: 'text',
  };
}
