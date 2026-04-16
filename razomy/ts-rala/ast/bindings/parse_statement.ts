import { Node } from "ts-morph";
import * as tsLang from "../..";

export function parseStatement(statement) {
    if (Node.isExportDeclaration(statement)) {
    const parsedNodes = tsLang.ast.bindings.parseExport(statement);
    return parsedNodes;
    } else if (tsLang.ast.bindings.isBindings(statement)) {
    const parsedNode = tsLang.ast.bindings.parse(statement);
    return [(parsedNode)];
    } else if (tsLang.ast.statements.isStatement(statement)) {
    const parsedNode = tsLang.ast.statements.parse(statement);
    return [(parsedNode)];
    } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}" "${statement.getText()}"`);
    }
}
