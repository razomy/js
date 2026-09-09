import {ThrowStatement} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseThrow(node: ThrowStatement): abstracts.translators.ThrowAst {
  const expressionNode = node.getExpression();

  return {
    kind: 'ThrowAst',
    syntaxLayer: 1,
    value: expressionNode
      ? tsRl.ast.expressions.parse(expressionNode)
      // fallback, если почему-то нет выражения (хотя в TS throw требует аргумент)
      : {kind: 'LiteralAst', syntaxLayer: 1, semanticLayer: 1, value: undefined} as abstracts.translators.AstNode,
  };
}
