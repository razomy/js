import { Block, Node, type Statement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseBlock(node: Block | Statement | null): abstracts.translators.BlockAst {
  if (!node) return { kind: 'BlockAst', syntaxLayer: 3, statements: [] };

  if (Node.isBlock(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: tsRl.ast.bindings.parseModuleBody(node) };
  }
  if (tsRl.ast.statements.isStatement(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: tsRl.ast.bindings.parseStatement(node) };
  }
  if (tsRl.ast.expressions.isExpression(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: [tsRl.ast.expressions.parse(node)] };
  }
  throw new Error('Unrecognized block statement: ' + node.getText());
}
