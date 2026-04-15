import {Block, Node, type Statement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import {parseModuleBody} from "../bindings";
import {parseStatement} from "../bindings/parse_module_body";
import {isStatement} from "./parse";
import {isExpression, parse} from "../expressions/parse";

export function parseBlock(node: Block | Statement | null): abstracts.translators.BlockStatement {
  if (!node) {
    return {
      kind: 'BlockStatement',
      declarations: [],
    };
  }

  if (Node.isBlock(node)) {
    const declarations = parseModuleBody(node);

    return {
      kind: 'BlockStatement',
      declarations: declarations,
    };
  }

  if (isStatement(node)) {
    const parsedStmt = parseStatement(node);
    return {
      kind: 'BlockStatement',
      declarations: parsedStmt
    };
  }

  if (isExpression(node)) {
    const parsedStmt = parse(node);
    return {
      kind: 'BlockStatement',
      declarations: [parsedStmt] as any
    };
  }

  throw new Error('Unrecognized block statement statement' + node);
}
