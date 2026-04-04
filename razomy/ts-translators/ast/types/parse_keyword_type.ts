import { Node, SyntaxKind } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseKeywordType(node: Node): abstracts.translators.KeywordType | null {
  const kind = node.getKind();
  let name: abstracts.translators.KeywordType['name'] | null = null;
  
  switch(kind) {
    case SyntaxKind.StringKeyword: name = 'String'; break;
    case SyntaxKind.ObjectKeyword: name = 'Object'; break;
    case SyntaxKind.NumberKeyword: name = 'Number'; break;
    case SyntaxKind.BooleanKeyword: name = 'Boolean'; break;
    case SyntaxKind.NullKeyword: name = 'Null'; break;
    case SyntaxKind.UndefinedKeyword: name = 'Undefined'; break;
    case SyntaxKind.BigIntKeyword: name = 'Bigint'; break;
    case SyntaxKind.SymbolKeyword: name = 'Symbol'; break;
    case SyntaxKind.AnyKeyword: name = 'Any'; break;
    case SyntaxKind.NeverKeyword: name = 'Never'; break;
    case SyntaxKind.UnknownKeyword: name = 'Unknown'; break;
    case SyntaxKind.VoidKeyword: name = 'Void'; break;
  }

  if (Node.isTypeReference(node)) {
    const typeName = node.getTypeName().getText();
    if (['Color', 'Date', 'File', 'FileArray', 'JsonString'].includes(typeName)) {
      name = typeName as abstracts.translators.KeywordType['name'];
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
