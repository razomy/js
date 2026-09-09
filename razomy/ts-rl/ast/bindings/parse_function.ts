import {FunctionDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseFunction(node: FunctionDeclaration): abstracts.translators.FunctionAst {
  const funcName = node.getNameOrThrow();
  const doc = tsRl.ast.doc.tryParseJsDoc(node);
  const title = doc ? tsRl.ast.doc.parseTitle(doc, funcName) : '';
  const examples = doc ? tsRl.ast.doc.parseExamples(doc, funcName) : [];
  const returnDescription = doc ? tsRl.ast.doc.parseReturn(doc, funcName) : '';
  const complexity = doc ? tsRl.ast.doc.parseComplexity(doc, funcName) : {time: '', memory: ''};
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  const shapes: abstracts.translators.AliasShapeBinding[] = node.getTypeParameters().map((typeParam) => {
    const constraintNode = typeParam.getConstraint();
    const defaultNode = typeParam.getDefault();

    let shape: abstracts.translators.ShapeType;
    if (constraintNode) {
      shape = tsRl.ast.shapes.parse(constraintNode);
    } else if (defaultNode) {
      shape = tsRl.ast.shapes.parse(defaultNode);
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
    kind: 'FunctionAst',
    identifier: node.getNameNode()
      ? tsRl.ast.bindings.parseIdentifier(node.getNameNode()!)
      : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map((p) => tsRl.ast.bindings.parseParameter(p)),
    returnShape: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shape: tsRl.ast.shapes.parse(node.getReturnTypeNode()!),
        meta: {description: returnDescription},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null, node.isGenerator() ? 'generator' as const : null].filter(
      (i) => i != null,
    ),
    block: tsRl.ast.statements.parseBlock(node.getBody() as any),
    shapes,
    meta: {
      description: doc ? tsRl.ast.doc.parseFunctionDescription(doc) : '',
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
