import {ArrowFunction} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseArrowFunction(node: ArrowFunction) {
  const shapes: abstracts.translators.AliasShapeBinding[] = node.getTypeParameters().map((typeParam) => {
    const constraintNode = typeParam.getConstraint();
    const defaultNode = typeParam.getDefault();

    let shape: abstracts.translators.ShapeType;
    if (constraintNode) {
      shape = tsTranslators.ast.shapes.parse(constraintNode);
    } else if (defaultNode) {
      shape = tsTranslators.ast.shapes.parse(defaultNode);
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
    parameters: node.getParameters().map((p) => tsTranslators.ast.bindings.parseParameter(p)),
    return_: node.getReturnTypeNode()
      ? {
        kind: 'ReturnShape',
        shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getReturnTypeNode()!),
        meta: {description: ''},
      }
      : null,
    modifiers: [node.isAsync() ? 'async' as const : null].filter(
      (i) => i != null,
    ),
    block: tsTranslators.ast.statements.parseBlock(node.getBody() as any),
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
