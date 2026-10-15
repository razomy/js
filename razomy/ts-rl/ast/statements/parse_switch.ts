import { SwitchStatement, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseSwitch(node: SwitchStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.SwitchAsn {
  const branches: abstractions.translators.SwitchBranchAsnType[] = [];

  // Целевое выражение, которое находится в switch (...)
  const targetExpression = tsRl.ast.expressions.parse(node.getExpression(), ctx);

  // Получаем все ветки case и default
  const clauses = node.getCaseBlock().getClauses();

  for (const clause of clauses) {
    // Получаем стейтменты (тело) конкретной ветки
    const statements = clause.getStatements();

    // Парсим массив стейтментов.
    // Если tsRl требует именно BlockAsn, возможно понадобится обернуть их вручную,
    // но обычно в таких трансляторах делают map по списку или используют специальный метод (например, parseList/parseStatements).
    // Для примера я предполагаю, что value принимает массив StatementAsn (или нужно собрать их в Block).
    const parsedValue = statements.map(stmt => tsRl.ast.statements.parse(stmt, ctx));

    if (Node.isCaseClause(clause)) {
      branches.push({
        kind: 'MatchBranchAsn',
        syntaxRole: 'statement',
        // pattern — это условие (значение после слова case)
        pattern: tsRl.ast.expressions.parse(clause.getExpression(), ctx),
        // value — это список стейтментов на выполнение
        value: {
          kind: 'BlockAsn',
          statements: parsedValue
        },
      } as abstractions.translators.MatchBranchAsn);

    } else if (Node.isDefaultClause(clause)) {
      branches.push({
        kind: 'DefaultBranchAsn',
        syntaxRole: 'statement',
        // у default нет pattern, только value
        value: {
          kind: 'BlockAsn',
          statements: parsedValue
        },
      } as abstractions.translators.DefaultBranchAsn);
    }
  }

  return {
    kind: 'SwitchAsn',
    target: targetExpression,
    syntaxRole: 'statement',
    branches,
  };
}
