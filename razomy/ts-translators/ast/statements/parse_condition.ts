import { IfStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseCondition(node: IfStatement): abstracts.translators.ConditionalFlowStatement {
  const branches: abstracts.translators.BranchFlowStatement[] = []; // В вашем типе тут почему-то рекурсия, но по логике это BranchFlowStatement

  // 1. Ветка IF (Then)
  const thenBranch: abstracts.translators.BranchFlowStatement = {
    kind: 'BranchFlowStatement',
    type: 'if',
    pattern: tsTranslators.ast.expressions.parse(node.getExpression()),
    block: tsTranslators.ast.statements.parseBlock(node.getThenStatement()),
  };

  // ВАЖНО: В вашем интерфейсе `branches` у ConditionalFlowStatement требует `ConditionalFlowStatement[]`.
  // Если это опечатка в архитектуре и там должно быть `BranchFlowStatement[]`, нужно поправить интерфейс.
  // Ниже каст Any, чтобы не ругался TS, пока вы не решите как лучше в интерфейсах.
  branches.push(thenBranch as any);

  // 2. Ветка ELSE (если есть)
  const elseNode = node.getElseStatement();
  if (elseNode) {
    // Ветка ELSE не имеет паттерна
    const elseBranch: abstracts.translators.BranchFlowStatement = {
      kind: 'BranchFlowStatement',
      type: 'if', // Или можно добавить 'else' в тип в абстракциях
      pattern: null,
      block: tsTranslators.ast.statements.parseBlock(elseNode),
    };
    branches.push(elseBranch as any);
  }

  return {
    kind: 'ConditionalFlowStatement',
    target: null, // target используется для switch (например switch(target))
    branches,
  };
}

