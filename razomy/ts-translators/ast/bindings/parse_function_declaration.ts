import {FunctionDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseFunctionDeclaration(node: FunctionDeclaration): abstracts.translators.FunctionBinding {
  const funcName = node.getNameOrThrow();
  const doc = tsTranslators.ast.doc.tryParseJsDoc(node);
  const title = doc ? tsTranslators.ast.doc.parseTitleOrThrow(doc, funcName) : '';
  const examples = doc ? tsTranslators.ast.doc.parseExamples(doc, funcName) : [];
  const returnDescription = doc ? tsTranslators.ast.doc.parseReturnOrThrow(doc, funcName) : '';
  const complexity = doc ? tsTranslators.ast.doc.parseComplexity(doc, funcName) : {time: '', memory: ''};
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  const shapes: abstracts.translators.AliasShapeBinding[] = node.getTypeParameters().map((typeParam) => {
    const constraintNode = typeParam.getConstraint();
    const defaultNode = typeParam.getDefault();

    let shape: abstracts.translators.ShapeType;
    if (constraintNode) {
      shape = tsTranslators.ast.shapes.parseShape(constraintNode);
    } else if (defaultNode) {
      shape = tsTranslators.ast.shapes.parseShape(defaultNode);
    } else {
      shape = {kind: 'BuildInShape', type: 'Any', value: null};
    }

    return {
      kind: 'AliasShapeBinding',
      meta: {description: ''},
      shapeIdentifier: {
        kind: 'ShapeIdentifier',
        name: typeParam.getName(),
      },
      shape,
    };
  });

  return {
    kind: 'FunctionBinding',
    identifier: node.getNameNode()
      ? tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()!)
      : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map((p) => tsTranslators.ast.bindings.parseParameterDeclaration(p)),
    return_: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getReturnTypeNode()!),
        meta: {description: returnDescription},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null, node.isGenerator() ? 'generator' as const : null].filter(
      (i) => i != null,
    ),
    block: tsTranslators.ast.statements.parseBlockStatement(node.getBody() as any),
    shapes,
    meta: {
      description: doc ? tsTranslators.ast.doc.parseFunctionDescriptionOrThrow(doc) : '',
      title,
      performance: {
        history,
        timeDataSizeComplexityFn: complexity.time,
        memoryDataSizeComplexityFn: complexity.memory,
      },
      examples,
    },
  };
}
