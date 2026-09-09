import { Node, PropertyAccessExpression, ElementAccessExpression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse } from './parse';

export function parseMember(node: PropertyAccessExpression | ElementAccessExpression): translators.MemberAst | translators.ArgumentMemberAst {
  if (Node.isPropertyAccessExpression(node)) {
    return {
      kind: 'MemberAst', syntaxLayer: 2,
      object_: parse(node.getExpression())!,
      property: { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getName() } as translators.LiteralAst,
    };
  } else {
    return {
      kind: 'ArgumentMemberAst', syntaxLayer: 2,
      argument: parse(node.getExpression())!,
      property: parse(node.getArgumentExpressionOrThrow())!,
    };
  }
}
