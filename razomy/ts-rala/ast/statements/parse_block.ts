import {Block, Node, type Statement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRala from "@razomy/ts-rala";

export function parseBlock(node: Block | Statement | null): abstracts.translators.BlockStatement {
  if (!node) {
    return {
      kind: 'BlockStatement',
      declarations: [],
    };
  }

  if (Node.isBlock(node)) {
    const declarations = tsRala.ast.bindings.parseModuleBody(node);

    return {
      kind: 'BlockStatement',
      declarations: declarations,
    };
  }

  if (tsRala.ast.statements.isStatement(node)) {
    const parsedStmt = tsRala.ast.bindings.parseStatement(node);
    return {
      kind: 'BlockStatement',
      declarations: parsedStmt
    };
  }

  if (tsRala.ast.expressions.isExpression(node)) {
    const parsedStmt = tsRala.ast.expressions.parse(node);
    return {
      kind: 'BlockStatement',
      declarations: [parsedStmt] as any
    };
  }

  throw new Error('Unrecognized block statement statement' + node);
}
