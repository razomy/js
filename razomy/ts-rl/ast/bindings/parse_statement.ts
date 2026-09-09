import { Node } from "ts-morph";
import * as tsRl from "@razomy/ts-rl";

export function parseStatement(statement) {
    if (Node.isExportDeclaration(statement)) {
    const parsedNodes = tsRl.ast.bindings.parseExport(statement);
    return parsedNodes;
    } else if (tsRl.ast.bindings.isBindings(statement)) {
    const parsedNode = tsRl.ast.bindings.parse(statement);
    return [(parsedNode)];
    } else if (tsRl.ast.statements.isStatement(statement)) {
    const parsedNode = tsRl.ast.statements.parse(statement);
    return [(parsedNode)];
    } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}" "${statement.getText()}"`);
    }
}
