import {Block, Node, type Statement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsLang from "../..";

export function parseBlock(node: Block | Statement | null): abstracts.translators.BlockStatement {
  if (!node) {
    return {
      kind: 'BlockStatement',
      declarations: [],
    };
  }

  if (Node.isBlock(node)) {
    const declarations = tsLang.ast.bindings.parseModuleBody(node);

    return {
      kind: 'BlockStatement',
      declarations: declarations,
    };
  }

  if (tsLang.ast.statements.isStatement(node)) {
    const parsedStmt = tsLang.ast.bindings.parseStatement(node);
    return {
      kind: 'BlockStatement',
      declarations: parsedStmt
    };
  }

  if (tsLang.ast.expressions.isExpression(node)) {
    const parsedStmt = tsLang.ast.expressions.parse(node);
    return {
      kind: 'BlockStatement',
      declarations: [parsedStmt] as any
    };
  }

  throw new Error('Unrecognized block statement statement' + node);
}
