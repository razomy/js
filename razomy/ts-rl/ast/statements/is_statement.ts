import { Node, Statement } from "ts-morph";

export function isStatement(node: Statement): boolean {
    return Node.isBlock(node)
    || Node.isIfStatement(node)
    || Node.isForStatement(node)
    || Node.isForInStatement(node)
    || Node.isForOfStatement(node)
    || Node.isWhileStatement(node)
    || Node.isDoStatement(node)
    || Node.isReturnStatement(node)
    || Node.isBreakStatement(node)
    || Node.isContinueStatement(node)
    || Node.isThrowStatement(node)
    || Node.isVariableStatement(node)
    || Node.isExpressionStatement(node)
    || Node.isTryStatement(node)
    ;
}
