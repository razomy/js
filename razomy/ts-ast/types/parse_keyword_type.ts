import { Node, SyntaxKind } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseKeywordType(node: Node): abstracts.ast.KeywordType | null {
  const kind = node.getKind();
  let name: abstracts.ast.KeywordType['name'] | null = null;
  
  switch(kind) {
    case SyntaxKind.StringKeyword: name = 'string'; break;
    case SyntaxKind.SymbolKeyword: name = 'symbol'; break;
    case SyntaxKind.ObjectKeyword: name = 'object'; break;
    case SyntaxKind.NumberKeyword: name = 'number'; break;
    case SyntaxKind.BooleanKeyword: name = 'boolean'; break;
    case SyntaxKind.NullKeyword: name = 'null'; break;
    case SyntaxKind.UndefinedKeyword: name = 'undefined'; break;
    case SyntaxKind.AnyKeyword: name = 'any'; break;
    case SyntaxKind.NeverKeyword: name = 'never'; break;
    case SyntaxKind.UnknownKeyword: name = 'unknown'; break;
    case SyntaxKind.BigIntKeyword: name = 'bigint'; break;
    case SyntaxKind.VoidKeyword: name = 'void'; break;
  }

  if (Node.isTypeReference(node)) {
    const typeName = node.getTypeName().getText();
    if (['color', 'date', 'file', 'fileArray', 'jsonString'].includes(typeName)) {
      name = typeName as abstracts.ast.KeywordType['name'];
    }
  }

  if (name) {
    return {
      kind: 'KeywordType',
      name,
    };
  }

  return null;
}
