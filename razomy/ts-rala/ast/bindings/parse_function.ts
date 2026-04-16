import {FunctionDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseFunction(node: FunctionDeclaration): abstracts.translators.FunctionBinding {
  const funcName = node.getNameOrThrow();
  const doc = tsRala.ast.doc.tryParseJsDoc(node);
  const title = doc ? tsRala.ast.doc.parseTitle(doc, funcName) : '';
  const examples = doc ? tsRala.ast.doc.parseExamples(doc, funcName) : [];
  const returnDescription = doc ? tsRala.ast.doc.parseReturn(doc, funcName) : '';
  const complexity = doc ? tsRala.ast.doc.parseComplexity(doc, funcName) : {time: '', memory: ''};
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  const shapes: abstracts.translators.AliasShapeBinding[] = node.getTypeParameters().map((typeParam) => {
    const constraintNode = typeParam.getConstraint();
    const defaultNode = typeParam.getDefault();

    let shape: abstracts.translators.ShapeType;
    if (constraintNode) {
      shape = tsRala.ast.shapes.parse(constraintNode);
    } else if (defaultNode) {
      shape = tsRala.ast.shapes.parse(defaultNode);
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
      ? tsRala.ast.bindings.parseIdentifier(node.getNameNode()!)
      : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map((p) => tsRala.ast.bindings.parseParameter(p)),
    return_: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shape: tsRala.ast.shapes.parse(node.getReturnTypeNode()!),
        meta: {description: returnDescription},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null, node.isGenerator() ? 'generator' as const : null].filter(
      (i) => i != null,
    ),
    block: tsRala.ast.statements.parseBlock(node.getBody() as any),
    shapes,
    meta: {
      description: doc ? tsRala.ast.doc.parseFunctionDescription(doc) : '',
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
