import {ArrowFunction} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRala from "@razomy/ts-rala";

export function parseArrowFunction(node: ArrowFunction) {
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
    identifier: {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map((p) => tsRala.ast.bindings.parseParameter(p)),
    return_: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shapeIdentifier: tsRala.ast.shapes.parseShapeIdentifier(node.getReturnTypeNode()!),
        meta: {description: ''},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null].filter(
      (i) => i != null,
    ),
    block: tsRala.ast.statements.parseBlock(node.getBody() as any),
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
