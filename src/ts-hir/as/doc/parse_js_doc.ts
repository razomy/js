import { JSDoc, JSDocTag, JSDocText, Node, SyntaxKind } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseJsDoc(jsDoc: JSDoc, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.DocsAsn {
  const docsAsn: abstractions.translator.DocsAsn = {
    id: random.createUuid(),
    kind: 'DocsAsn',
    block: [],
    syntaxRole: 'text',
  };

  if (!ctx.enter(docsAsn, jsDoc)) {
    return docsAsn;
  }

  const block: (abstractions.translator.TextAsn | abstractions.translator.TagAsn)[] = [];
  const children = jsDoc.getChildren() as (JSDocTag | JSDocText)[];

  for (const child of children) {
    if (Node.isJSDocTag(child)) {
      const name = child.getTagName();

      if (name === 'summary') {
        block.push({
          id: random.createUuid(),
          kind: 'TagAsn',
          identifier: {
            name: 'title',
          },
          syntaxRole: 'text',
          value: {
            id: random.createUuid(),
            kind: 'LiteralAsn',
            value: child.getCommentText()?.trim() ?? '',
            syntaxRole: 'text',
            semanticLayer: 'state',
          },
        });
      } else if (name === 'example') {
        const example = tsHir.as.doc.parseExamples(child.getCommentText()?.trim()!, ctx);

        block.push({
          id: random.createUuid(),
          kind: 'TagAsn',
          identifier: {
            name: child.getTagName(),
          },
          syntaxRole: 'text',
          value: {
            id: random.createUuid(),
            kind: 'BlockAsn',
            syntaxRole: 'text',
            statements: [
              {
                id: random.createUuid(),
                kind: 'LiteralAsn',
                value: example.code,
                syntaxRole: 'text',
                semanticLayer: 'state',
              },
              {
                id: random.createUuid(),
                kind: 'LiteralAsn',
                value: example.expected,
                syntaxRole: 'text',
                semanticLayer: 'state',
              },
            ],
          },
        });
      } else {
        block.push({
          id: random.createUuid(),
          kind: 'TagAsn',
          identifier: {
            name: child.getTagName(),
          },
          syntaxRole: 'text',
          value: {
            id: random.createUuid(),
            kind: 'LiteralAsn',
            value: child.getCommentText()?.trim() ?? '',
            syntaxRole: 'text',
            semanticLayer: 'state',
          },
        });
      }
    } else if (child.getKind() === SyntaxKind.JSDocText || child.getKind() === SyntaxKind.JSDocComment) {
      const value = child.getText().trim();
      if (value) {
        block.push({
          id: random.createUuid(),
          kind: 'TextAsn',
          value: {
            id: random.createUuid(),
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

  docsAsn.block = block;
  return ctx.leave(docsAsn, jsDoc);
}
