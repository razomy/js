import { Node } from "ts-morph";
import * as translators from '@razomy/abstracts/translators';
import { parseExport } from "./parse_export";
import { isBindings } from "./is_bindings";
import { parse as parseBinding } from "./parse";
import { isStatement, parse as parseStmt } from "../statements";

export function parseStatement(statement: Node): translators.AstType[] {
  if (Node.isExportDeclaration(statement)) {
    return parseExport(statement);
  } else if (isBindings(statement as any)) {
    const res = parseBinding(statement);
    return Array.isArray(res) ? res : [res]; // Поддержка функций (docs + func)
  } else if (isStatement(statement as any)) {
    return [parseStmt(statement as any)];
  } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}"`);
  }
}
