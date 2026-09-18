import { Node } from 'ts-morph';

export function isBindings(node: Node): boolean {
  return (
    Node.isVariableStatement(node) ||
    Node.isTypeAliasDeclaration(node) ||
    Node.isImportDeclaration(node) ||
    Node.isVariableDeclaration(node) ||
    Node.isVariableDeclarationList(node) ||
    Node.isExportDeclaration(node) ||
    Node.isExportAssignment(node) ||
    Node.isExpressionStatement(node) ||
    (Node.isExpressionStatement(node) && Node.isBinaryExpression(node.getExpression()))
  );
}
