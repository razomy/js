import {Block, type Statement, Node} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

function isStatementType(obj: any): boolean {
  return obj && typeof obj.kind === 'string' && obj.kind.includes('Statement');
}

export function parseBlockStatement(node: Block | Statement | null): abstracts.translators.BlockStatement {
  if (!node) {
    return {
      kind: 'BlockStatement',
      declarations: [],
    };
  }

  if (Node.isBlock(node)) {
    const declarations = node.getStatements()
      .map(stmt => tsTranslators.ast.statements.parseStatement(stmt))
      .filter((stmt) => stmt !== null) as abstracts.translators.StatementType[];

    return {
      kind: 'BlockStatement',
      declarations: declarations,
    };
  }

    const parsedStmt = tsTranslators.ast.statements.parseStatement(node);
    return {
      kind: 'BlockStatement',
      declarations: parsedStmt && isStatementType(parsedStmt) ? [parsedStmt as abstracts.translators.StatementType] : []
    };

  throw new Error('Unrecognized block statement statement' + node);
}
