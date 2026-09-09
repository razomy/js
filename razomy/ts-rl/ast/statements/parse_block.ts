import { Block, Node, type Statement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseModuleBody } from "../bindings/parse_module_body";
import { parseStatement } from "../bindings/parse_statement";
import { isStatement } from "./is_statement";
import { isExpression, parse as parseExpr } from "../expressions";

export function parseBlock(node: Block | Statement | null): translators.BlockAst {
  if (!node) return { kind: 'BlockAst', syntaxLayer: 3, statements: [] };

  if (Node.isBlock(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: parseModuleBody(node) };
  }
  if (isStatement(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: parseStatement(node) };
  }
  if (isExpression(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: [parseExpr(node)] };
  }
  throw new Error('Unrecognized block statement: ' + node.getText());
}
