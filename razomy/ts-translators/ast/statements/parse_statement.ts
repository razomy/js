import { Node, Statement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

// Импорты ниже мы реализуем в следующих шагах

export function parseStatement(node: Statement): abstracts.translators.DeclarationType | null {
  if (Node.isBlock(node)) {
    return tsTranslators.ast.statements.parseBlockStatement(node);
  }

  if (Node.isIfStatement(node)) {
    return tsTranslators.ast.statements.parseIfStatement(node);
  }

  if (
    Node.isForStatement(node) ||
    Node.isForInStatement(node) ||
    Node.isForOfStatement(node) ||
    Node.isWhileStatement(node) ||
    Node.isDoStatement(node)
  ) {
    return tsTranslators.ast.statements.parseLoopStatement(node);
  }

  if (Node.isReturnStatement(node)) {
    // Кастуем как any, так как в текущей онтологии ReturnExpression не входит в DeclarationType
    return tsTranslators.ast.statements.parseReturnStatement(node) as any;
  }

  if (Node.isBreakStatement(node) || Node.isContinueStatement(node)) {
    return tsTranslators.ast.statements.parseBreakOrContinueStatement(node);
  }

  if (Node.isThrowStatement(node)) {
    return tsTranslators.ast.statements.parseThrowStatement(node);
  }

  if (Node.isVariableStatement(node)) {
    // В TS VariableStatement может содержать несколько деклараций (let a = 1, b = 2).
    // По вашей архитектуре это должно обрабатываться через parseVariableBinding
    // Для простоты берем первую декларацию (или можно возвращать массив и делать flatMap)
    const declarations = node.getDeclarations();
    if (declarations.length > 0) {
      return tsTranslators.ast.bindings.parseVariableBinding(declarations[0] as any);
    }
  }

  // Если это Type Alias внутри функции
  if (Node.isTypeAliasDeclaration(node)) {
    return tsTranslators.ast.bindings.parseTypeAliasBinding(node);
  }

  // ExpressionStatement (например, `a = 1;` или `myFunc();`)
  // В вашей онтологии ActionClause/CallExpression обрабатываются отдельно.
  // Можно возвращать null или мапить на ваш тип.
  return null;
}

