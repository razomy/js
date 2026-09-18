import { Node, SyntaxKind } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';
import type { StateAstType } from '@razomy/abstracts/translators';

export function parse(node: Node): abstracts.translators.AstType {
  if (Node.isLiteralTypeNode(node)) {
    return {
      kind: 'LiteralAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      value: node.getText(),
    };
  }
  if (Node.isTypeOperatorTypeNode(node)) {
    return {
      kind: 'UnaryAst',
      syntaxLayer: 2,
      isPrefix: true,
      operator: SyntaxKind[node.getOperator()] as any,
      value: parse(node.getTypeNode()) as StateAstType,
    };
  }
  if (Node.isRestTypeNode(node)) {
    return {
      kind: 'UnaryAst',
      syntaxLayer: 2,
      isPrefix: true,
      operator: 'rest',
      value: parse(node.getTypeNode()) as StateAstType,
    };
  }
  if (Node.isTypeQuery(node)) {
    return {
      kind: 'UnaryAst',
      syntaxLayer: 2,
      isPrefix: true,
      operator: 'rest',
      value: { kind: 'LiteralAst', value: node.getText(), syntaxLayer: 1, semanticLayer: 1},
    };
  }
  if (Node.isParameterDeclaration(node)) {
    return {
      kind: 'ParameterAst',
      syntaxLayer: 2,
      modifiers: [],
      identifier: { name: node.getName() },
      shape: null,
      value: node.getInitializer() ? (parse(node.getInitializer()!) as abstracts.translators.StateAstType) : null,
    };
  }
  if (Node.isConstructorTypeNode(node)) {
    return {
      kind: 'LambdaAst',
      syntaxLayer: 2,
      modifiers: [{ kind: 'FunctionModifierAst', operator: 'new', syntaxLayer: 2, value: null }],
      parameters: node.getParameters().map((param) => parse(param)) as any,
      returnShape: node.getReturnTypeNode() ? parse(node.getReturnTypeNode()!) : null,
      block: {
        kind: 'BlockAst',
        syntaxLayer: 2,
        statements: [],
      },
      semanticLayer: 2,
    };
  }

  if (Node.isConditionalTypeNode(node)) {
    return {
      kind: 'TernaryAst',
      syntaxLayer: 2,
      branches: [parse(node.getTrueType()!), parse(node.getFalseType()!)] as any,
    };
  }
  if (Node.isPropertySignature(node)) {
    return {
      kind: 'PropertyAst',
      syntaxLayer: 2,
      semanticLayer: 1,
      shape: null,
      identifier: { name: node.getName() },
      value: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    };
  }
  if (Node.isArrayTypeNode(node)) {
    return {
      kind: 'ArrayAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      values: [parse(node.getElementTypeNode())],
    } as abstracts.translators.ArrayAst;
  }
  if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    return {
      kind: 'TupleAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      values: node.getTypeNodes().map(parse),
    } as abstracts.translators.TupleAst;
  }
  if (Node.isTypeLiteral(node)) {
    return {
      kind: 'StyleBlockAst', // или ваш вид узла
      syntaxLayer: 2,
      // Получаем все свойства, сигнатуры вызовов и методов внутри { ... }
      statements: node.getMembers().map((member) => parse(member)),
    };
  }
  if (Node.isTupleTypeNode(node)) {
    return {
      kind: 'TupleAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      values: node.getElements().map(parse).filter(Boolean) as abstracts.translators.AstType[],
    };
  }
  if (Node.isMappedTypeNode(node)) {
    return {
      kind: 'MappedAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      constraint: {
        kind: 'LiteralAst',
        value:'',
        syntaxLayer: 2,
        semanticLayer: 2,
      } as any,
      value: parse(node.getTypeNode()!) as any,
    };
  }
  if (Node.isFunctionTypeNode(node)) {
    return {
      kind: 'LambdaAst',
      syntaxLayer: 2,
      modifiers: [],
      parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
      returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
      block: {
        kind: 'BlockAst',
        syntaxLayer: 2,
        statements: [],
      },
      semanticLayer: 2,
    };
  }
  if (Node.isTypeReference(node)) {
    return {
      kind: 'ReferenceAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      identifier: { name: node.getTypeName().getText() },
    } as abstracts.translators.ReferenceAst;
  }

  if (Node.isIndexedAccessTypeNode(node)) {
    return {
      kind: 'MemberAst',
      syntaxLayer: 2,
      object_: parse(node.getObjectTypeNode()),
      property: parse(node.getIndexTypeNode()),
    };
  }
  if (Node.isIndexSignatureDeclaration(node)) {
    return {
      kind: 'MappedAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      constraint: {
        kind: 'LiteralAst',
        value: node.getKeyName(),
        syntaxLayer: 2,
        semanticLayer: 2,
      },
      value: parse(node.getKeyTypeNode()) as any,
    };
  }
  if (Node.isParenthesizedTypeNode(node)) {
    return {
      kind: 'BlockAst',
      syntaxLayer: 2,
      statements: node.getDescendantStatements().map(parse),
    };
  }
  if (Node.isTypePredicate(node)) {
    return {
      kind: 'BinaryAst',
      syntaxLayer: 2,
      left: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      right: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      operator: 'is'
    };
  }
  if (Node.isTemplateLiteralTypeNode(node)) {
    return {
      kind: 'BinaryAst',
      syntaxLayer: 2,
      left: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      right: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      operator: 'is'
    };
  }
  if (Node.isNamedTupleMember(node)) {
    return {
      kind: 'BinaryAst',
      syntaxLayer: 2,
      left: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      right: { kind:'LiteralAst', semanticLayer: 2, syntaxLayer:2, value: node.getText()},
      operator: 'is'
    };
  }
  const kind = node.getKindName();
  if (kind.includes('Keyword')) {
    return {
      kind: 'ReferenceAst',
      syntaxLayer: 2,
      semanticLayer: 2,
      identifier: { name: node.getText() },
    } as abstracts.translators.ReferenceAst;
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
