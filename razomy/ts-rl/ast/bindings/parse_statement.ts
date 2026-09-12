import {Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseStatement(statement: Node): abstracts.translators.AstType[] {
  if (Node.isExportDeclaration(statement)) {
    return tsRl.ast.bindings.parseExport(statement);
  } else if (Node.isExportAssignment(statement)) {
    return tsRl.ast.bindings.parseExportAssignment(statement);
  } else if (tsRl.ast.bindings.isBindings(statement as any)) {
    const res = tsRl.ast.bindings.parse(statement);
    return Array.isArray(res) ? res : [res]; // Поддержка функций (docs + func)
  } else if (tsRl.ast.statements.isStatement(statement as any)) {
    return [tsRl.ast.statements.parse(statement as any)];
  } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}":"${statement.getText()}"`);
  }
}

