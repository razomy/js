import { SwitchStatement, Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseSwitch(node: SwitchStatement): abstracts.translators.SwitchAst {
  const branches: abstracts.translators.SwitchBranchAstType[] = [];

  // Целевое выражение, которое находится в switch (...)
  const targetExpression = tsRl.ast.expressions.parse(node.getExpression());

  // Получаем все ветки case и default
  const clauses = node.getCaseBlock().getClauses();

  for (const clause of clauses) {
    // Получаем стейтменты (тело) конкретной ветки
    const statements = clause.getStatements();

    // Парсим массив стейтментов.
    // Если tsRl требует именно BlockAst, возможно понадобится обернуть их вручную,
    // но обычно в таких трансляторах делают map по списку или используют специальный метод (например, parseList/parseStatements).
    // Для примера я предполагаю, что value принимает массив StatementAst (или нужно собрать их в Block).
    const parsedValue = statements.map(stmt => tsRl.ast.statements.parse(stmt));

    if (Node.isCaseClause(clause)) {
      branches.push({
        kind: 'MatchBranchAst',
        syntaxLayer: 3,
        // pattern — это условие (значение после слова case)
        pattern: tsRl.ast.expressions.parse(clause.getExpression()),
        // value — это список стейтментов на выполнение
        value: {
          kind: 'BlockAst',
          statements: parsedValue
        },
      } as abstracts.translators.MatchBranchAst);

    } else if (Node.isDefaultClause(clause)) {
      branches.push({
        kind: 'DefaultBranchAst',
        syntaxLayer: 3,
        // у default нет pattern, только value
        value: {
          kind: 'BlockAst',
          statements: parsedValue
        },
      } as abstracts.translators.DefaultBranchAst);
    }
  }

  return {
    kind: 'SwitchAst',
    target: targetExpression,
    syntaxLayer: 3,
    branches,
  };
}
