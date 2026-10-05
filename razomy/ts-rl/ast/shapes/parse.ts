import { Node, SyntaxKind } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';
import type { StateAsnType } from '@razomy/abstracts/translators';
import type { HasEnterLeaveProduce } from '../unknown_node_exception';

export function parse(node: Node, ctx: HasEnterLeaveProduce): abstracts.translators.AsnType {
  if (Node.isLiteralTypeNode(node)) {
    return {
      kind: 'LiteralAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      value: node.getText(),
    };
  }
  if (Node.isTypeOperatorTypeNode(node)) {
    return {
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: SyntaxKind[node.getOperator()] as any,
      value: parse(node.getTypeNode(),ctx) as StateAsnType,
    };
  }
  if (Node.isRestTypeNode(node)) {
    return {
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: parse(node.getTypeNode(),ctx) as StateAsnType,
    };
  }
  if (Node.isTypeQuery(node)) {
    return {
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: { kind: 'LiteralAsn', value: node.getText(), syntaxRole: 'text', semanticLayer: 'state' },
    };
  }
  if (Node.isParameterDeclaration(node)) {
    return {
      kind: 'ParameterAsn',
      syntaxRole: 'expression',
      modifiers: [],
      identifier: { name: node.getName() },
      shape: null,
      value: node.getInitializer() ? (parse(node.getInitializer()!,ctx) as abstracts.translators.StateAsnType) : null,
    };
  }
  if (Node.isConstructorTypeNode(node)) {
    return {
      kind: 'LambdaAsn',
      syntaxRole: 'expression',
      modifiers: [{ kind: 'FunctionModifierAsn', operator: 'new', syntaxRole: 'modifier', value: null }],
      parameters: node.getParameters().map((param) => parse(param,ctx)) as any,
      returnShape: node.getReturnTypeNode() ? parse(node.getReturnTypeNode()!,ctx) : null,
      block: {
        kind: 'BlockAsn',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
  }

  if (Node.isConditionalTypeNode(node)) {
    return {
      kind: 'TernaryAsn',
      syntaxRole: 'expression',
      branches: [parse(node.getTrueType()!,ctx), parse(node.getFalseType()!,ctx)] as any,
    };
  }
  if (Node.isPropertySignature(node)) {
    return {
      kind: 'PropertyAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      shape: null,
      identifier: { name: node.getName() },
      value: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!,ctx) : null,
    };
  }
  if (Node.isArrayTypeNode(node)) {
    return {
      kind: 'ArrayAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: [parse(node.getElementTypeNode(),ctx)],
    } as abstracts.translators.ArrayAsn;
  }
  if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    return {
      kind: 'TupleAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: node.getTypeNodes().map((i) => parse(i, ctx)),
    } as abstracts.translators.TupleAsn;
  }
  if (Node.isTypeLiteral(node)) {
    return {
      kind: 'StyleBlockAsn', // или ваш вид узла
      syntaxRole: 'expression',
      // Получаем все свойства, сигнатуры вызовов и методов внутри { ... }
      statements: node.getMembers().map((member) => parse(member, ctx)),
    };
  }
  if (Node.isTupleTypeNode(node)) {
    return {
      kind: 'TupleAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: node.getElements().map(i=>parse(i,ctx)).filter(Boolean) as abstracts.translators.AsnType[],
    };
  }
  if (Node.isMappedTypeNode(node)) {
    return {
      kind: 'MappedAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        kind: 'LiteralAsn',
        value: '',
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      } as any,
      value: parse(node.getTypeNode()!, ctx) as any,
    };
  }
  if (Node.isFunctionTypeNode(node)) {
    return {
      kind: 'LambdaAsn',
      syntaxRole: 'expression',
      modifiers: [],
      parameters: node.getParameters().map(i=>tsRl.ast.bindings.parseParameter(i,ctx)),
      returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!,ctx) : null,
      block: {
        kind: 'BlockAsn',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
  }
  if (Node.isTypeReference(node)) {
    return {
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getTypeName().getText() },
    } as abstracts.translators.ReferenceAsn;
  }

  if (Node.isIndexedAccessTypeNode(node)) {
    return {
      kind: 'MemberAsn',
      syntaxRole: 'expression',
      object_: parse(node.getObjectTypeNode(),ctx),
      property: parse(node.getIndexTypeNode(),ctx),
    };
  }
  if (Node.isIndexSignatureDeclaration(node)) {
    return {
      kind: 'MappedAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        kind: 'LiteralAsn',
        value: node.getKeyName(),
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      },
      value: parse(node.getKeyTypeNode(),ctx) as any,
    };
  }
  if (Node.isParenthesizedTypeNode(node)) {
    return {
      kind: 'BlockAsn',
      syntaxRole: 'expression',
      statements: node.getDescendantStatements().map(i=>parse(i,ctx)),
    };
  }
  if (Node.isTypePredicate(node)) {
    return {
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }
  if (Node.isTemplateLiteralTypeNode(node)) {
    return {
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }
  if (Node.isNamedTupleMember(node)) {
    return {
      kind: 'BinaryAsn',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAsn', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }

  if (Node.isThisTypeNode(node)) {
    return {
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getText() },
    } as abstracts.translators.ReferenceAsn;
  }
  const kind = node.getKindName();
  if (kind.includes('Keyword')) {
    return {
      kind: 'ReferenceAsn',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getText() },
    } as abstracts.translators.ReferenceAsn;
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
