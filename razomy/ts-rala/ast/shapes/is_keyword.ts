import { Node, SyntaxKind } from "ts-morph";

export function isKeyword(node: Node) {
    const kind = node.getKind();
    switch (kind) {
    case SyntaxKind.StringKeyword:
    case SyntaxKind.ObjectKeyword:
    case SyntaxKind.NumberKeyword:
    case SyntaxKind.BooleanKeyword:
    case SyntaxKind.NullKeyword:
    case SyntaxKind.UndefinedKeyword:
    case SyntaxKind.BigIntKeyword:
    case SyntaxKind.SymbolKeyword:
    case SyntaxKind.AnyKeyword:
    case SyntaxKind.NeverKeyword:
    case SyntaxKind.UnknownKeyword:
    case SyntaxKind.FalseKeyword:
    case SyntaxKind.TrueKeyword:
    case SyntaxKind.VoidKeyword:
      return true;
    default:
      return false;
    }
}
