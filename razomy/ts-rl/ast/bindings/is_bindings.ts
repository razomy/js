import { Node, type Statement } from "ts-morph";

export function isBindings(node: Statement): boolean {
    return Node.isVariableDeclaration(node)
    || Node.isTypeAliasDeclaration(node)
    || Node.isInterfaceDeclaration(node)
    || Node.isEnumDeclaration(node)
    || Node.isFunctionDeclaration(node)
    || Node.isClassDeclaration(node)
    || Node.isImportDeclaration(node)
    || (Node.isExpressionStatement(node) && Node.isBinaryExpression(node.getExpression()))
    ;
}
