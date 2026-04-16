import { ConditionalExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseConditional(node: ConditionalExpression): abstracts.translators.ConditionalFlowExpression {
  const branches: abstracts.translators.BranchFlowExpression[] = []; // В вашем типе тут почему-то рекурсия, но по логике это BranchFlowExpression

  // 1. Ветка IF (Then)
  const thenBranch: abstracts.translators.BranchFlowExpression = {
    kind: 'BranchFlowExpression',
    type: 'if',
    pattern: tsLang.ast.expressions.parse(node.getCondition()),
    expression: tsLang.ast.expressions.parse(node.getWhenTrue()),
  };

  // ВАЖНО: В вашем интерфейсе `branches` у ConditionalFlowExpression требует `ConditionalFlowExpression[]`.
  // Если это опечатка в архитектуре и там должно быть `BranchFlowExpression[]`, нужно поправить интерфейс.
  // Ниже каст Any, чтобы не ругался TS, пока вы не решите как лучше в интерфейсах.
  branches.push(thenBranch as any);

  // 2. Ветка ELSE (если есть)
  const elseNode = node.getWhenFalse();
  if (elseNode) {
    // Ветка ELSE не имеет паттерна
    const elseBranch: abstracts.translators.BranchFlowExpression = {
      kind: 'BranchFlowExpression',
      type: 'if', // Или можно добавить 'else' в тип в абстракциях
      pattern: null,
      expression: tsLang.ast.expressions.parse(elseNode),
    };
    branches.push(elseBranch as any);
  }

  return {
    kind: 'ConditionalFlowExpression',
    target: null, // target используется для switch (например switch(target))
    branches,
  };
}

