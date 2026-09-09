import {Block, Node, type Statement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseBlock(node: Block | Statement | null): abstracts.translators.BlockStatement {
  if (!node) {
    return {
      kind: 'BlockStatement',
      declarations: [],
    };
  }

  if (Node.isBlock(node)) {
    const declarations = tsRl.ast.bindings.parseModuleBody(node);

    return {
      kind: 'BlockStatement',
      declarations: declarations,
    };
  }

  if (tsRl.ast.statements.isStatement(node)) {
    const parsedStmt = tsRl.ast.bindings.parseStatement(node);
    return {
      kind: 'BlockStatement',
      declarations: parsedStmt
    };
  }

  if (tsRl.ast.expressions.isExpression(node)) {
    const parsedStmt = tsRl.ast.expressions.parse(node);
    return {
      kind: 'BlockStatement',
      declarations: [parsedStmt] as any
    };
  }

  throw new Error('Unrecognized block statement statement' + node);
}
