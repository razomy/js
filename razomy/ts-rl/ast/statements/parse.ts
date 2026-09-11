import { Node, Statement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parse(node: Statement): abstracts.translators.AstType {
  if (Node.isBlock(node)) return tsRl.ast.statements.parseBlock(node);
  if (Node.isIfStatement(node)) return tsRl.ast.statements.parseCondition(node);
  if (Node.isTryStatement(node)) return { kind: 'TryAst', syntaxLayer: 3, block: tsRl.ast.statements.parseBlock(node.getTryBlock()) } as abstracts.translators.TryAst; // Basic Try mapping
  if (Node.isForStatement(node) || Node.isForInStatement(node) || Node.isForOfStatement(node) || Node.isWhileStatement(node) || Node.isDoStatement(node)) return tsRl.ast.statements.parseLoop(node);
  if (Node.isReturnStatement(node)) return tsRl.ast.statements.parseReturn(node);
  if (Node.isBreakStatement(node) || Node.isContinueStatement(node)) return tsRl.ast.statements.parseGo(node);
  if (Node.isThrowStatement(node)) return tsRl.ast.statements.parseThrow(node);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    return decls.length > 0 ? tsRl.ast.bindings.parseVariable(decls[0] as any) : { kind: 'BlockAst', syntaxLayer: 3, statements: [] } as abstracts.translators.BlockAst;
  }
  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isCallExpression(expr)) return tsRl.ast.expressions.parseCall(expr);
    if (Node.isUnaryExpression(expr)) return tsRl.ast.expressions.parseUnary(expr);
    throw new Error(`Unknown ExpressionStmt "${expr.getKindName()}"`);
  }
  throw new Error(`Unknown Statement "${node.getKindName()}"`);
}
