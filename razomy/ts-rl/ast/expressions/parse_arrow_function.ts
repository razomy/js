import {ArrowFunction} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseArrowFunction(node: ArrowFunction) {
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
    identifier: {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map((p) => tsRl.ast.bindings.parseParameter(p)),
    returnShape: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shapeIdentifier: tsRl.ast.shapes.parseShapeIdentifier(node.getReturnTypeNode()!),
        meta: {description: ''},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null].filter(
      (i) => i != null,
    ),
    block: tsRl.ast.statements.parseBlock(node.getBody() as any),
    shapes,
    meta: {
      description: '',
      title:'',
      performance: {
        history: [],
        timeDataSizeComplexityFn: '',
        memoryDataSizeComplexityFn: '',
      },
      examples:[],
    },
  } as any;
}
