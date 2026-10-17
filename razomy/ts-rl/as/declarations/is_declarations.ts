import { Node } from 'ts-morph';

export function isDeclarations(node: Node): boolean {
  return (
    Node.isInterfaceDeclaration(node) ||
    Node.isEnumDeclaration(node) ||
    Node.isFunctionDeclaration(node) ||
    Node.isClassDeclaration(node)
  );
}
