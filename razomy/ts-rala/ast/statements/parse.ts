import {Node, Statement} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

// Импорты ниже мы реализуем в следующих шагах

export function parse(node: Statement): abstracts.translators.DeclarationType {
  if (Node.isBlock(node)) {
    return tsRala.ast.statements.parseBlock(node);
  }

  if (Node.isIfStatement(node)) {
    return tsRala.ast.statements.parseCondition(node);
  }

  if (Node.isTryStatement(node)) {
    return null as any;
  }

  if (
    Node.isForStatement(node) ||
    Node.isForInStatement(node) ||
    Node.isForOfStatement(node) ||
    Node.isWhileStatement(node) ||
    Node.isDoStatement(node)
  ) {
    return tsRala.ast.statements.parseLoop(node);
  }

  if (Node.isReturnStatement(node)) {
    // Кастуем как any, так как в текущей онтологии ReturnExpression не входит в DeclarationType
    return tsRala.ast.statements.parseReturn(node) as any;
  }

  if (Node.isBreakStatement(node) || Node.isContinueStatement(node)) {
    return tsRala.ast.statements.parseGo(node);
  }

  if (Node.isThrowStatement(node)) {
    return tsRala.ast.statements.parseThrow(node);
  }

  if (Node.isVariableStatement(node)) {
    // В TS VariableStatement может содержать несколько деклараций (let a = 1, b = 2).
    // По вашей архитектуре это должно обрабатываться через parseVariableBinding
    // Для простоты берем первую декларацию (или можно возвращать массив и делать flatMap)
    const declarations = node.getDeclarations();
    if (declarations.length > 0) {
      return tsRala.ast.bindings.parseVariable(declarations[0] as any);
    }
  }

  if (Node.isExpressionStatement(node)) {
    const node2 = node.getExpression();
    if (Node.isCallExpression(node2)) {
      //TODO: add bridge;
      return tsRala.ast.expressions.parseCall(node2) as any;
    }
    if (Node.isUnaryExpression(node2)) {
      //TODO: add bridge;
      return tsRala.ast.expressions.parseUnary(node2) as any;
    }
    throw new Error(`Unknown Expression "${node2.getKindName()}" "${node2.getText()}"`);
  }

  throw new Error(`Unknown Statements "${node.getKindName()}" "${node.getText()}"`);
}

