import { Node } from "ts-morph";
import * as tsRala from "@razomy/ts-rala";

export function parseStatement(statement) {
    if (Node.isExportDeclaration(statement)) {
    const parsedNodes = tsRala.ast.bindings.parseExport(statement);
    return parsedNodes;
    } else if (tsRala.ast.bindings.isBindings(statement)) {
    const parsedNode = tsRala.ast.bindings.parse(statement);
    return [(parsedNode)];
    } else if (tsRala.ast.statements.isStatement(statement)) {
    const parsedNode = tsRala.ast.statements.parse(statement);
    return [(parsedNode)];
    } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}" "${statement.getText()}"`);
    }
}
