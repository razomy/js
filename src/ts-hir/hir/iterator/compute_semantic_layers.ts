import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export function computeSemanticLayers(
  ctx: tsHir.hir.SemanticContext,
  node: abstractions.translator.HirnType,
  parentLayer: abstractions.translator.SemanticLayer = 'state',
): void {
  let layer: abstractions.translator.SemanticLayer = parentLayer;

  // 1. Определение слоя на основе роли и типа узла HIR
  if (node.syntaxRole === 'modifier' || (node.kind === 'ReferenceHirn' && (node as any).target?.value === 'import')) {
    layer = 'meta';
  } else if (node.syntaxRole === 'text') {
    layer = 'meta';
  } else {
    switch (node.kind) {
      // Структуры: интерфейсы являются типами (shape), классы/объекты — state
      case 'StructHirn': {
        const isTypeDefinition = node.modifiers.some(
          (m: any) => m.kind === 'LiteralHirn' && (m.value === 'interface' || m.value === 'type'),
        );
        layer = isTypeDefinition ? 'shape' : 'state';
        break;
      }

      // Операторы приведения типов и проверки форм
      case 'OperatorHirn': {
        if (
          node.operator === 'typeof' ||
          node.operator === 'as' ||
          node.operator === 'satisfies' ||
          node.operator === 'constraint'
        ) {
          layer = 'shape';
        } else if (node.operator === 'query') {
          layer = 'meta';
        } else {
          layer = parentLayer;
        }
        break;
      }

      default: {
        // Если уже был задан валидный слой из IStateAsn / ShapingAsn — сохраняем его
        layer = (node.semanticLayer as any) || parentLayer;
        break;
      }
    }
  }

  node.semanticLayer = layer;

  // 2. Специфический проброс слоя в дочерние ветки (shape/returnShape всегда 'shape')
  if (node.kind === 'BindingHirn') {
    if (node.shape) {
      computeSemanticLayers(ctx, node.shape, 'shape');
    }
    if (node.value) {
      computeSemanticLayers(ctx, node.value, layer);
    }
  } else if (node.kind === 'FunctionHirn') {
    if (node.returnShape) {
      computeSemanticLayers(ctx, node.returnShape, 'shape');
    }
    for (const param of node.parameters) {
      computeSemanticLayers(ctx, param, 'state');
    }
    if (node.block) {
      computeSemanticLayers(ctx, node.block, 'state');
    }
  } else {
    // 3. Рекурсивный проход вглубь по графу
    tsHir.hir.iterator.walkHirChildren(
      node,
      (child) => computeSemanticLayers(ctx, child, layer),
      (children) => {
        for (const child of children) {
          computeSemanticLayers(ctx, child, layer);
        }
      },
    );
  }
}
