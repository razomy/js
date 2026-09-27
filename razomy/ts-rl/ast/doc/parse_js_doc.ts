// doc-parser.ts
import { JSDoc, JSDocTag, JSDocText, Node, SyntaxKind } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

/**
 * Парсит JSDoc узел ts-morph в DocsAst
 */
export function parseJsDoc(jsDoc: JSDoc): abstracts.translators.DocsAst {
  const block: (abstracts.translators.TextAst | abstracts.translators.TagAst)[] = [];

  // Дочерние узлы JSDoc в AST TypeScript
  // jsDoc.getChildren() возвращает синтаксические узлы: JSDocComment, JSDocTag, etc.
  const children = jsDoc.getChildren() as (JSDocTag | JSDocText)[];

  for (const child of children) {
    // Если это тег (например, JSDocParameterTag, JSDocReturnTag или просто JSDocTag)
    if (Node.isJSDocTag(child)) {
      const name = child.getTagName();

      if (name === 'summary') {
        block.push({
          kind: 'TagAst',
          identifier: {
            name: 'title',
          },
          syntaxLayer: 'text',
          value: {
            kind: 'LiteralAst',
            value: child.getCommentText()?.trim() ?? '',
            syntaxLayer: 'text',
            semanticLayer: 'state',
          },
        });
      } else if (name === 'example') {
        const example = tsRl.ast.doc.parseExamples(child.getCommentText()?.trim()!);

        block.push({
          kind: 'TagAst',
          identifier: {
            name: child.getTagName(),
          },
          syntaxLayer: 'text',
          value: {
            kind: 'BlockAst',
            syntaxLayer: 'text',
            statements: [
              {
                kind: 'LiteralAst',
                value: example.code,
                syntaxLayer: 'text',
                semanticLayer: 'state',
              },
              {
                kind: 'LiteralAst',
                value: example.code,
                syntaxLayer: 'text',
                semanticLayer: 'state',
              },
            ],
          },
        });
      } else {
        block.push({
          kind: 'TagAst',
          identifier: {
            name: child.getTagName(),
          },
          syntaxLayer: 'text',
          value: {
            kind: 'LiteralAst',
            value: child.getCommentText()?.trim() ?? '',
            syntaxLayer: 'text',
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
          kind: 'TextAst',
          value: {
            kind: 'LiteralAst',
            value,
            syntaxLayer: 'text',
            semanticLayer: 'state',
          },
          syntaxLayer: 'text',
        });
      }
    }
  }

  return {
    kind: 'DocsAst',
    block,
    syntaxLayer: 'text',
  };
}
