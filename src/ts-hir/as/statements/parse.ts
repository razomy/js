import { Node, Statement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import type {BlockAsn} from "@razomy/abstractions/translator";
import * as tsHir from "@razomy/ts-hir";

export function parse(node: Statement, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.AsnType {
  if (Node.isBlock(node)) {
    const blockAsn: abstractions.translator.BlockAsn = {
      id: random.createUuid(),
      kind: 'BlockAsn',
      syntaxRole: 'statement',
      statements: [],
    };
    if (!ctx.enter(blockAsn, node)) return blockAsn;
    blockAsn.statements = tsHir.as.declarations.parseModuleBody(node, ctx);
    return ctx.leave(blockAsn, node);
  }
  if (Node.isIfStatement(node)) return tsHir.as.statements.parseCondition(node, ctx);
  if (Node.isSwitchStatement(node)) return tsHir.as.statements.parseSwitch(node, ctx);
  if (Node.isTryStatement(node)) {
    const tryAsn: abstractions.translator.TryAsn = {
      id: random.createUuid(),
      kind: 'TryAsn',
      syntaxRole: 'statement',
      block: null as any,
    };
    if (!ctx.enter(tryAsn, node)) return tryAsn;
    tryAsn.block = tsHir.as.statements.parse(node.getTryBlock(), ctx)  as BlockAsn;
    return ctx.leave(tryAsn, node);
  }
  if (Node.isForStatement(node)) {
    const forAsn: abstractions.translator.ForItAsn = {
      id: random.createUuid(),
      kind: 'ForItAsn',
      syntaxRole: 'statement',
      init: node.getInitializer() ? tsHir.as.parseNode(node.getInitializer()!, ctx) as any : null,
      condition: null,
      update: null,
      block: null as any,
    };
    if (!ctx.enter(forAsn, node)) return forAsn;
    forAsn.condition = node.getCondition() ? tsHir.as.expressions.parse(node.getCondition()!, ctx) : null;
    forAsn.update = node.getIncrementor() ? tsHir.as.expressions.parse(node.getIncrementor()!, ctx) : null;
    forAsn.block = tsHir.as.statements.parse(node.getStatement(), ctx) as BlockAsn;
    return ctx.leave(forAsn, node);
  }
  if (Node.isWhileStatement(node)) {
    const whileAsn: abstractions.translator.WhileDoAsn = {
      id: random.createUuid(),
      kind: 'WhileDoAsn',
      syntaxRole: 'statement',
      condition: null as any,
      block: null as any,
    };
    if (!ctx.enter(whileAsn, node)) return whileAsn;
    whileAsn.condition = tsHir.as.expressions.parse(node.getExpression(), ctx);
    whileAsn.block = tsHir.as.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(whileAsn, node);
  }
  if (Node.isDoStatement(node)) {
    const doAsn: abstractions.translator.DoWhileAsn = {
      id: random.createUuid(),
      kind: 'DoWhileAsn',
      syntaxRole: 'statement',
      condition: null as any,
      block: null as any,
    };
    if (!ctx.enter(doAsn, node)) return doAsn;
    doAsn.condition = tsHir.as.expressions.parse(node.getExpression(), ctx);
    doAsn.block = tsHir.as.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(doAsn, node);
  }
  if (Node.isForOfStatement(node)) {
    const forOfAsn: abstractions.translator.ForOfAsn = {
      id: random.createUuid(),
      kind: 'ForOfAsn',
      syntaxRole: 'statement',
      init: null as any,
      block: null as any,
    };
    if (!ctx.enter(forOfAsn, node)) return forOfAsn;
    forOfAsn.init = tsHir.as.expressions.parse(node.getExpression(), ctx);
    forOfAsn.block = tsHir.as.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(forOfAsn, node);
  }
  if (Node.isForInStatement(node)) {
    const forInAsn: abstractions.translator.ForIAsn = {
      id: random.createUuid(),
      kind: 'ForInAsn',
      syntaxRole: 'statement',
      init: null,
      condition: null,
      update: null,
      block: null as any,
    };
    if (!ctx.enter(forInAsn, node)) return forInAsn;
    forInAsn.block = tsHir.as.statements.parse(node.getStatement(), ctx)  as BlockAsn;
    return ctx.leave(forInAsn, node);
  }
  if (Node.isReturnStatement(node)) return tsHir.as.statements.parseReturn(node, ctx);
  if (Node.isBreakStatement(node)) {
    const label = node.getLabel();
    const breakAsn: abstractions.translator.BreakAsn = {
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
    const continueAsn: abstractions.translator.ContinueAsn = {
      id: random.createUuid(),
      kind: 'ContinueAsn',
      syntaxRole: 'statement',
      identifier: label ? { name: label.getText() } : null,
    };
    if (!ctx.enter(continueAsn, node)) return continueAsn;
    return ctx.leave(continueAsn, node);
  }
  if (Node.isThrowStatement(node)) return tsHir.as.statements.parseThrow(node, ctx);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    if (decls.length > 0) {
      return tsHir.as.bindings.parseVariable(decls[0] as any, ctx);
    }
    const emptyBlock: abstractions.translator.BlockAsn = {
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

    const callAsn: abstractions.translator.CallAsn = {
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
    return tsHir.as.expressions.parse(expr, ctx);
  }
  throw new tsHir.as.UnknownNodeException(node);
}
