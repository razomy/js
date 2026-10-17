import { Node, SyntaxKind } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';
import type { StateAsnType } from '@razomy/abstractions/translators';
import type { HasEnterLeaveProduce } from '../unknown_node_exception';

export function parse(node: Node, ctx: HasEnterLeaveProduce): abstractions.translators.AsnType {
  if (Node.isLiteralTypeNode(node)) {
    const literalAsn: abstractions.translators.LiteralAsn = {
      id: random.createUuid(),
      kind: 'LiteralAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      value: node.getText(),
    };
    if (!ctx.enter(literalAsn, node)) return literalAsn;
    return ctx.leave(literalAsn, node);
  }
  if (Node.isTypeOperatorTypeNode(node)) {
    const unaryAsn: abstractions.translators.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: SyntaxKind[node.getOperator()] as any,
      value: null as any,
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    unaryAsn.value = parse(node.getTypeNode(), ctx) as StateAsnType;
    return ctx.leave(unaryAsn, node);
  }
  if (Node.isRestTypeNode(node)) {
    const unaryAsn: abstractions.translators.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: null as any,
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    unaryAsn.value = parse(node.getTypeNode(), ctx) as StateAsnType;
    return ctx.leave(unaryAsn, node);
  }
  if (Node.isTypeQuery(node)) {
    const unaryAsn: abstractions.translators.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: { id: random.createUuid(), kind: 'LiteralAsn', value: node.getText(), syntaxRole: 'text', semanticLayer: 'state' },
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    return ctx.leave(unaryAsn, node);
  }
  if (Node.isParameterDeclaration(node)) {
    const paramAsn: abstractions.translators.ParameterAsn = {
      id: random.createUuid(),
      kind: 'ParameterAsn',
      syntaxRole: 'expression',
      modifiers: [],
      identifier: { name: node.getName() },
      shape: null,
      value: null,
    };
    if (!ctx.enter(paramAsn, node)) return paramAsn;
    paramAsn.value = node.getInitializer() ? (parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType) : null;
    return ctx.leave(paramAsn, node);
  }
  if (Node.isConstructorTypeNode(node)) {
    const lambdaAsn: abstractions.translators.LambdaAsn = {
      id: random.createUuid(),
      kind: 'LambdaAsn',
      syntaxRole: 'expression',
      modifiers: [{ id: random.createUuid(), kind: 'FunctionModifierAsn', operator: 'new', syntaxRole: 'modifier', value: null }],
      parameters: [],
      returnShape: null,
      block: {
        id: random.createUuid(),
        kind: 'BlockAsn',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
    if (!ctx.enter(lambdaAsn, node)) return lambdaAsn;
    lambdaAsn.parameters = node.getParameters().map((param) => parse(param, ctx)) as any;
    lambdaAsn.returnShape = node.getReturnTypeNode() ? parse(node.getReturnTypeNode()!, ctx) : null;
    return ctx.leave(lambdaAsn, node);
  }

  if (Node.isConditionalTypeNode(node)) {
    const ternaryAsn: abstractions.translators.TernaryAsn = {
      id: random.createUuid(),
      kind: 'TernaryAsn',
      syntaxRole: 'expression',
      branches: [],
    };
    if (!ctx.enter(ternaryAsn, node)) return ternaryAsn;
    ternaryAsn.branches = [parse(node.getTrueType()!, ctx), parse(node.getFalseType()!, ctx)] as any;
    return ctx.leave(ternaryAsn, node);
  }
  if (Node.isPropertySignature(node)) {
    const propAsn: abstractions.translators.PropertyAsn = {
      id: random.createUuid(),
      kind: 'PropertyAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      shape: null,
      identifier: { name: node.getName() },
      value: null,
    };
    if (!ctx.enter(propAsn, node)) return propAsn;
    propAsn.value = node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null;
    return ctx.leave(propAsn, node);
  }
  if (Node.isArrayTypeNode(node)) {
    const arrayAsn: abstractions.translators.ArrayAsn = {
      id: random.createUuid(),
      kind: 'ArrayAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: [],
    };
    if (!ctx.enter(arrayAsn, node)) return arrayAsn;
    arrayAsn.values = [parse(node.getElementTypeNode(), ctx)];
    return ctx.leave(arrayAsn, node);
  }
  if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    const tupleAsn: abstractions.translators.TupleAsn = {
      id: random.createUuid(),
      kind: 'TupleAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: [],
    };
    if (!ctx.enter(tupleAsn, node)) return tupleAsn;
    tupleAsn.values = node.getTypeNodes().map((i) => parse(i, ctx));
    return ctx.leave(tupleAsn, node);
  }
  if (Node.isTypeLiteral(node)) {
    const styleBlockAsn: abstractions.translators.StyleBlockAsn = {
      id: random.createUuid(),
      kind: 'StyleBlockAsn',
      syntaxRole: 'expression',
      statements: [],
    };
    if (!ctx.enter(styleBlockAsn, node)) return styleBlockAsn;
    styleBlockAsn.statements = node.getMembers().map((member) => parse(member, ctx));
    return ctx.leave(styleBlockAsn, node);
  }
  if (Node.isTupleTypeNode(node)) {
    const tupleAsn: abstractions.translators.TupleAsn = {
      id: random.createUuid(),
      kind: 'TupleAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: [],
    };
    if (!ctx.enter(tupleAsn, node)) return tupleAsn;
    tupleAsn.values = node.getElements().map((i) => parse(i, ctx)).filter(Boolean) as abstractions.translators.AsnType[];
    return ctx.leave(tupleAsn, node);
  }
  if (Node.isMappedTypeNode(node)) {
    const mappedAsn: abstractions.translators.MappedAsn = {
      id: random.createUuid(),
      kind: 'MappedAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        id: random.createUuid(),
        kind: 'LiteralAsn',
        value: '',
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      } as any,
      value: null as any,
    };
    if (!ctx.enter(mappedAsn, node)) return mappedAsn;
    mappedAsn.value = parse(node.getTypeNode()!, ctx) as any;
    return ctx.leave(mappedAsn, node);
  }
  if (Node.isFunctionTypeNode(node)) {
    const lambdaAsn: abstractions.translators.LambdaAsn = {
      id: random.createUuid(),
      kind: 'LambdaAsn',
      syntaxRole: 'expression',
      modifiers: [],
      parameters: [],
      returnShape: null,
      block: {
        id: random.createUuid(),
        kind: 'BlockAsn',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
    if (!ctx.enter(lambdaAsn, node)) return lambdaAsn;
    lambdaAsn.parameters = node.getParameters().map((i) => tsRl.ast.bindings.parseParameter(i, ctx));
    lambdaAsn.returnShape = node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!, ctx) : null;
    return ctx.leave(lambdaAsn, node);
  }
  if (Node.isTypeReference(node)) {
    const refAsn: abstractions.translators.ReferenceAsn = {
      id: random.createUuid(),
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      identifier: { name: node.getTypeName().getText() },
    };
    if (!ctx.enter(refAsn, node)) return refAsn;
    return ctx.leave(refAsn, node);
  }

  if (Node.isIndexedAccessTypeNode(node)) {
    const memberAsn: abstractions.translators.MemberAsn = {
      id: random.createUuid(),
      kind: 'MemberAsn',
      syntaxRole: 'expression',
      object_: null as any,
      property: null as any,
    };
    if (!ctx.enter(memberAsn, node)) return memberAsn;
    memberAsn.object_ = parse(node.getObjectTypeNode(), ctx);
    memberAsn.property = parse(node.getIndexTypeNode(), ctx);
    return ctx.leave(memberAsn, node);
  }
  if (Node.isIndexSignatureDeclaration(node)) {
    const mappedAsn: abstractions.translators.MappedAsn = {
      id: random.createUuid(),
      kind: 'MappedAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        id: random.createUuid(),
        kind: 'LiteralAsn',
        value: node.getKeyName(),
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      },
      value: null as any,
    };
    if (!ctx.enter(mappedAsn, node)) return mappedAsn;
    mappedAsn.value = parse(node.getKeyTypeNode(), ctx) as any;
    return ctx.leave(mappedAsn, node);
  }
  if (Node.isParenthesizedTypeNode(node)) {
    const blockAsn: abstractions.translators.BlockAsn = {
      id: random.createUuid(),
      kind: 'BlockAsn',
      syntaxRole: 'expression',
      statements: [],
    };
    if (!ctx.enter(blockAsn, node)) return blockAsn;
    blockAsn.statements = node.getDescendantStatements().map((i) => parse(i, ctx));
    return ctx.leave(blockAsn, node);
  }
  if (Node.isTypePredicate(node)) {
    const binaryAsn: abstractions.translators.BinaryAsn = {
      id: random.createUuid(),
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
    if (!ctx.enter(binaryAsn, node)) return binaryAsn;
    return ctx.leave(binaryAsn, node);
  }
  if (Node.isTemplateLiteralTypeNode(node)) {
    const binaryAsn: abstractions.translators.BinaryAsn = {
      id: random.createUuid(),
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
    if (!ctx.enter(binaryAsn, node)) return binaryAsn;
    return ctx.leave(binaryAsn, node);
  }
  if (Node.isNamedTupleMember(node)) {
    const binaryAsn: abstractions.translators.BinaryAsn = {
      id: random.createUuid(),
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { id: random.createUuid(), kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
    if (!ctx.enter(binaryAsn, node)) return binaryAsn;
    return ctx.leave(binaryAsn, node);
  }

  if (Node.isThisTypeNode(node)) {
    const refAsn: abstractions.translators.ReferenceAsn = {
      id: random.createUuid(),
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      identifier: { name: node.getText() },
    };
    if (!ctx.enter(refAsn, node)) return refAsn;
    return ctx.leave(refAsn, node);
  }
  const kind = node.getKindName();
  if (kind.includes('Keyword')) {
    const refAsn: abstractions.translators.ReferenceAsn = {
      id: random.createUuid(),
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      identifier: { name: node.getText() },
    };
    if (!ctx.enter(refAsn, node)) return refAsn;
    return ctx.leave(refAsn, node);
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
