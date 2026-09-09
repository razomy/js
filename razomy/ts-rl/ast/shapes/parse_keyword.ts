import {Node, SyntaxKind} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseKeyword(node: Node): abstracts.translators.BuildInShape {
  const kind = node.getKind();
  let type: abstracts.translators.BuildInShape['type'] | null = null;

  switch (kind) {
    case SyntaxKind.StringKeyword:
      type = 'String';
      break;
    case SyntaxKind.ObjectKeyword:
      type = 'Object';
      break;
    case SyntaxKind.NumberKeyword:
      type = 'Number';
      break;
    case SyntaxKind.BooleanKeyword:
      type = 'Boolean';
      break;
    case SyntaxKind.NullKeyword:
      type = 'Null';
      break;
    case SyntaxKind.UndefinedKeyword:
      type = 'Undefined';
      break;
    case SyntaxKind.BigIntKeyword:
      type = 'Bigint';
      break;
    case SyntaxKind.SymbolKeyword:
      type = 'Symbol';
      break;
    case SyntaxKind.AnyKeyword:
      type = 'Any';
      break;
    case SyntaxKind.NeverKeyword:
      type = 'Never';
      break;
    case SyntaxKind.UnknownKeyword:
      type = 'Unknown';
      break;
    case SyntaxKind.FalseKeyword:
      type = 'Boolean';
      break;
    case SyntaxKind.TrueKeyword:
      type = 'Boolean';
      break;
    case SyntaxKind.VoidKeyword:
      type = 'Void';
      break;
  }

  if (type) {
    return {
      kind: 'BuildInShape',
      type,
      value: type,
    };
  }

  throw new Error(`Unknown Keyword "${node.getKindName()}"`);

}
