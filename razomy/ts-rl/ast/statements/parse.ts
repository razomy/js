import { Node, Statement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseBlock } from './parse_block';
import { parseCondition } from './parse_condition';
import { parseLoop } from './parse_loop';
import { parseReturn } from './parse_return';
import { parseGo } from './parse_go';
import { parseThrow } from './parse_throw';
import { parseVariable } from '../bindings/parse_variable';
import { parseCall } from '../expressions/parse_call';
import { parseUnary } from '../expressions/parse_unary';

export function parse(node: Statement): translators.AstType {
  if (Node.isBlock(node)) return parseBlock(node);
  if (Node.isIfStatement(node)) return parseCondition(node);
  if (Node.isTryStatement(node)) return { kind: 'TryAst', syntaxLayer: 3, block: parseBlock(node.getTryBlock()) } as translators.TryAst; // Basic Try mapping
  if (Node.isForStatement(node) || Node.isForInStatement(node) || Node.isForOfStatement(node) || Node.isWhileStatement(node) || Node.isDoStatement(node)) return parseLoop(node);
  if (Node.isReturnStatement(node)) return parseReturn(node);
  if (Node.isBreakStatement(node) || Node.isContinueStatement(node)) return parseGo(node);
  if (Node.isThrowStatement(node)) return parseThrow(node);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    return decls.length > 0 ? parseVariable(decls[0] as any) : { kind: 'BlockAst', syntaxLayer: 3, statements: [] } as translators.BlockAst;
  }
  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isCallExpression(expr)) return parseCall(expr);
    if (Node.isUnaryExpression(expr)) return parseUnary(expr);
    throw new Error(`Unknown ExpressionStmt "${expr.getKindName()}"`);
  }
  throw new Error(`Unknown Statement "${node.getKindName()}"`);
}
