import { Node, SyntaxKind } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';
import type { StateAstType } from '@razomy/abstracts/translators';

export function parse(node: Node): abstracts.translators.AstType {
  if (Node.isLiteralTypeNode(node)) {
    return {
      kind: 'LiteralAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      value: node.getText(),
    };
  }
  if (Node.isTypeOperatorTypeNode(node)) {
    return {
      kind: 'UnaryAst',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: SyntaxKind[node.getOperator()] as any,
      value: parse(node.getTypeNode()) as StateAstType,
    };
  }
  if (Node.isRestTypeNode(node)) {
    return {
      kind: 'UnaryAst',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: parse(node.getTypeNode()) as StateAstType,
    };
  }
  if (Node.isTypeQuery(node)) {
    return {
      kind: 'UnaryAst',
      syntaxRole: 'expression',
      isPrefix: true,
      operator: 'rest',
      value: { kind: 'LiteralAst', value: node.getText(), syntaxRole: 'text', semanticLayer: 'state' },
    };
  }
  if (Node.isParameterDeclaration(node)) {
    return {
      kind: 'ParameterAst',
      syntaxRole: 'expression',
      modifiers: [],
      identifier: { name: node.getName() },
      shape: null,
      value: node.getInitializer() ? (parse(node.getInitializer()!) as abstracts.translators.StateAstType) : null,
    };
  }
  if (Node.isConstructorTypeNode(node)) {
    return {
      kind: 'LambdaAst',
      syntaxRole: 'expression',
      modifiers: [{ kind: 'FunctionModifierAst', operator: 'new', syntaxRole: 'modifier', value: null }],
      parameters: node.getParameters().map((param) => parse(param)) as any,
      returnShape: node.getReturnTypeNode() ? parse(node.getReturnTypeNode()!) : null,
      block: {
        kind: 'BlockAst',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
  }

  if (Node.isConditionalTypeNode(node)) {
    return {
      kind: 'TernaryAst',
      syntaxRole: 'expression',
      branches: [parse(node.getTrueType()!), parse(node.getFalseType()!)] as any,
    };
  }
  if (Node.isPropertySignature(node)) {
    return {
      kind: 'PropertyAst',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      shape: null,
      identifier: { name: node.getName() },
      value: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    };
  }
  if (Node.isArrayTypeNode(node)) {
    return {
      kind: 'ArrayAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: [parse(node.getElementTypeNode())],
    } as abstracts.translators.ArrayAst;
  }
  if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    return {
      kind: 'TupleAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: node.getTypeNodes().map(parse),
    } as abstracts.translators.TupleAst;
  }
  if (Node.isTypeLiteral(node)) {
    return {
      kind: 'StyleBlockAst', // или ваш вид узла
      syntaxRole: 'expression',
      // Получаем все свойства, сигнатуры вызовов и методов внутри { ... }
      statements: node.getMembers().map((member) => parse(member)),
    };
  }
  if (Node.isTupleTypeNode(node)) {
    return {
      kind: 'TupleAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      values: node.getElements().map(parse).filter(Boolean) as abstracts.translators.AstType[],
    };
  }
  if (Node.isMappedTypeNode(node)) {
    return {
      kind: 'MappedAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        kind: 'LiteralAst',
        value: '',
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      } as any,
      value: parse(node.getTypeNode()!) as any,
    };
  }
  if (Node.isFunctionTypeNode(node)) {
    return {
      kind: 'LambdaAst',
      syntaxRole: 'expression',
      modifiers: [],
      parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
      returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
      block: {
        kind: 'BlockAst',
        syntaxRole: 'expression',
        statements: [],
      },
      semanticLayer: 'shape',
    };
  }
  if (Node.isTypeReference(node)) {
    return {
      kind: 'ReferenceAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getTypeName().getText() },
    } as abstracts.translators.ReferenceAst;
  }

  if (Node.isIndexedAccessTypeNode(node)) {
    return {
      kind: 'MemberAst',
      syntaxRole: 'expression',
      object_: parse(node.getObjectTypeNode()),
      property: parse(node.getIndexTypeNode()),
    };
  }
  if (Node.isIndexSignatureDeclaration(node)) {
    return {
      kind: 'MappedAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      constraint: {
        kind: 'LiteralAst',
        value: node.getKeyName(),
        syntaxRole: 'expression',
        semanticLayer: 'shape',
      },
      value: parse(node.getKeyTypeNode()) as any,
    };
  }
  if (Node.isParenthesizedTypeNode(node)) {
    return {
      kind: 'BlockAst',
      syntaxRole: 'expression',
      statements: node.getDescendantStatements().map(parse),
    };
  }
  if (Node.isTypePredicate(node)) {
    return {
      kind: 'BinaryAst',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }
  if (Node.isTemplateLiteralTypeNode(node)) {
    return {
      kind: 'BinaryAst',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }
  if (Node.isNamedTupleMember(node)) {
    return {
      kind: 'BinaryAst',
      syntaxRole: 'expression',
      left: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      right: { kind: 'LiteralAst', semanticLayer: 'shape', syntaxRole: 'expression', value: node.getText() },
      operator: 'is',
    };
  }

  if (Node.isThisTypeNode(node)) {
    return {
      kind: 'ReferenceAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getText() },
    } as abstracts.translators.ReferenceAst;
  }
  const kind = node.getKindName();
  if (kind.includes('Keyword')) {
    return {
      kind: 'ReferenceAst',
      syntaxRole: 'expression',
      semanticLayer: 'shape',
      identifier: { name: node.getText() },
    } as abstracts.translators.ReferenceAst;
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
