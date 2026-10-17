import { Node, Statement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';
import type {BlockAsn} from "@razomy/abstractions/translators";

export function parse(node: Statement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType {
  if (Node.isBlock(node)) {
    const blockAsn: abstractions.translators.BlockAsn = {
      id: random.createUuid(),
      kind: 'BlockAsn',
      syntaxRole: 'statement',
      statements: [],
    };
    if (!ctx.enter(blockAsn, node)) return blockAsn;
    blockAsn.statements = tsRl.ast.declarations.parseModuleBody(node, ctx);
    return ctx.leave(blockAsn, node);
  }
  if (Node.isIfStatement(node)) return tsRl.ast.statements.parseCondition(node, ctx);
  if (Node.isSwitchStatement(node)) return tsRl.ast.statements.parseSwitch(node, ctx);
  if (Node.isTryStatement(node)) {
    const tryAsn: abstractions.translators.TryAsn = {
      id: random.createUuid(),
      kind: 'TryAsn',
      syntaxRole: 'statement',
      block: null as any,
    };
    if (!ctx.enter(tryAsn, node)) return tryAsn;
    tryAsn.block = tsRl.ast.statements.parse(node.getTryBlock(), ctx)  as BlockAsn;
    return ctx.leave(tryAsn, node);
  }
  if (Node.isForStatement(node)) {
    const forAsn: abstractions.translators.ForItAsn = {
      id: random.createUuid(),
      kind: 'ForItAsn',
      syntaxRole: 'statement',
      init: node.getInitializer() ? tsRl.ast.parseNode(node.getInitializer()!, ctx) as any : null,
      condition: null,
      update: null,
      block: null as any,
    };
    if (!ctx.enter(forAsn, node)) return forAsn;
    forAsn.condition = node.getCondition() ? tsRl.ast.expressions.parse(node.getCondition()!, ctx) : null;
    forAsn.update = node.getIncrementor() ? tsRl.ast.expressions.parse(node.getIncrementor()!, ctx) : null;
    forAsn.block = tsRl.ast.statements.parse(node.getStatement(), ctx) as BlockAsn;
    return ctx.leave(forAsn, node);
  }
  if (Node.isWhileStatement(node)) {
    const whileAsn: abstractions.translators.WhileDoAsn = {
      id: random.createUuid(),
      kind: 'WhileDoAsn',
      syntaxRole: 'statement',
      condition: null as any,
      block: null as any,
    };
    if (!ctx.enter(whileAsn, node)) return whileAsn;
    whileAsn.condition = tsRl.ast.expressions.parse(node.getExpression(), ctx);
    whileAsn.block = tsRl.ast.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(whileAsn, node);
  }
  if (Node.isDoStatement(node)) {
    const doAsn: abstractions.translators.DoWhileAsn = {
      id: random.createUuid(),
      kind: 'DoWhileAsn',
      syntaxRole: 'statement',
      condition: null as any,
      block: null as any,
    };
    if (!ctx.enter(doAsn, node)) return doAsn;
    doAsn.condition = tsRl.ast.expressions.parse(node.getExpression(), ctx);
    doAsn.block = tsRl.ast.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(doAsn, node);
  }
  if (Node.isForOfStatement(node)) {
    const forOfAsn: abstractions.translators.ForOfAsn = {
      id: random.createUuid(),
      kind: 'ForOfAsn',
      syntaxRole: 'statement',
      init: null as any,
      block: null as any,
    };
    if (!ctx.enter(forOfAsn, node)) return forOfAsn;
    forOfAsn.init = tsRl.ast.expressions.parse(node.getExpression(), ctx);
    forOfAsn.block = tsRl.ast.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(forOfAsn, node);
  }
  if (Node.isForInStatement(node)) {
    const forInAsn: abstractions.translators.ForIAsn = {
      id: random.createUuid(),
      kind: 'ForInAsn',
      syntaxRole: 'statement',
      init: null,
      condition: null,
      update: null,
      block: null as any,
    };
    if (!ctx.enter(forInAsn, node)) return forInAsn;
    forInAsn.block = tsRl.ast.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(forInAsn, node);
  }
  if (Node.isReturnStatement(node)) return tsRl.ast.statements.parseReturn(node, ctx);
  if (Node.isBreakStatement(node)) {
    const label = node.getLabel();
    const breakAsn: abstractions.translators.BreakAsn = {
      id: random.createUuid(),
      kind: 'BreakAsn',
      syntaxRole: 'statement',
      identifier: label ? { name: label.getText() } : null,
    };
    if (!ctx.enter(breakAsn, node)) return breakAsn;
    return ctx.leave(breakAsn, node);
  }

  if (Node.isContinueStatement(node)) {
    const label = node.getLabel();
    const continueAsn: abstractions.translators.ContinueAsn = {
      id: random.createUuid(),
      kind: 'ContinueAsn',
      syntaxRole: 'statement',
      identifier: label ? { name: label.getText() } : null,
    };
    if (!ctx.enter(continueAsn, node)) return continueAsn;
    return ctx.leave(continueAsn, node);
  }
  if (Node.isThrowStatement(node)) return tsRl.ast.statements.parseThrow(node, ctx);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    if (decls.length > 0) {
      return tsRl.ast.bindings.parseVariable(decls[0] as any, ctx);
    }
    const emptyBlock: abstractions.translators.BlockAsn = {
      id: random.createUuid(),
      kind: 'BlockAsn',
      syntaxRole: 'statement',
      statements: [],
    };
    if (!ctx.enter(emptyBlock, node)) return emptyBlock;
    return ctx.leave(emptyBlock, node);
  }
  if (Node.isCallExpression(node)) {
    const expression = node.getExpression();
    const identifier = Node.isIdentifier(expression) ? { name: expression.getText() } : null;

    const callAsn: abstractions.translators.CallAsn = {
      id: random.createUuid(),
      kind: 'CallAsn',
      syntaxRole: 'statement',
      identifier,
      arguments_: [],
    };
    if (!ctx.enter(callAsn, node)) return callAsn;
    callAsn.arguments_ = node.getArguments().map((arg) => parse(arg as any, ctx));
    return ctx.leave(callAsn, node);
  }

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    return tsRl.ast.expressions.parse(expr, ctx);
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
