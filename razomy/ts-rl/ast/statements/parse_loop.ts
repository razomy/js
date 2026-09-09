import { Node, Statement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseB } from "../bindings/parse";
import { parse as parseExpr } from "../expressions/parse";
import { parseBlock } from "./parse_block";

export function parseLoop(node: Statement): translators.IFlowAst {
  if (Node.isForStatement(node)) {
    return {
      kind: 'ForItAst', syntaxLayer: 3,
      init: node.getInitializer() ? parseB(node.getInitializer()!) : null,
      condition: node.getCondition() ? parseExpr(node.getCondition()!) : null,
      update: node.getIncrementor() ? parseExpr(node.getIncrementor()!) : null,
      block: parseBlock(node.getStatement()),
    } as translators.ForItAst;
  }
  if (Node.isWhileStatement(node)) {
    return { kind: 'WhileDoAst', syntaxLayer: 3, condition: parseExpr(node.getExpression()), block: parseBlock(node.getStatement()) } as translators.WhileDoAst;
  }
  if (Node.isDoStatement(node)) {
    return { kind: 'DoWhileAst', syntaxLayer: 3, condition: parseExpr(node.getExpression()), block: parseBlock(node.getStatement()) } as translators.DoWhileAst;
  }
  if (Node.isForOfStatement(node)) {
    return { kind: 'ForOfAst', syntaxLayer: 3, init: parseExpr(node.getExpression()), block: parseBlock(node.getStatement()) } as translators.ForOfAst;
  }
  if (Node.isForInStatement(node)) {
    return { kind: 'ForInAst', syntaxLayer: 3, init: null, condition: null, update: null, block: parseBlock(node.getStatement()) } as translators.ForIAst;
  }
  throw new Error('Unsupported loop node type');
}
