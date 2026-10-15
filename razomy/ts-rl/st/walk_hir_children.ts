import * as abstractions from '@razomy/abstractions';

/**
 * ЕДИНАЯ БАЗА ОБХОДА (УТИЛИТА):
 * Отвечает ТОЛЬКО за знание того, в каких полях лежат дочерние узлы.
 * Используйте эту функцию во всех фазах, чтобы не дублировать огромный switch.
 */
export function walkHirChildren<T extends abstractions.translators.ISemanticNode>(
  sNode: T,
  onChild: (child: T) => void,
  onArray: (children: T[]) => void,
) {
  // Локальные помощники делают код компактным
  function walk(child?: any) {
    if (child) onChild(child as T);
  }
  function walkArr(children?: any[]) {
    if (children && children.length > 0) onArray(children as T[]);
  }
  const node = sNode.hir;

  switch (node.kind) {
    case 'BlockHirn':
      walkArr(node.statements);
      break;
    case 'FunctionHirn':
      walkArr(node.modifiers);
      walk(node.returnShape);
      walkArr(node.parameters);
      walk(node.block);
      break;
    case 'StructHirn':
      walkArr(node.modifiers);
      walkArr(node.properties);
      break;
    case 'BindingHirn':
      walkArr(node.modifiers);
      walk(node.shape);
      walk(node.value);
      break;
    case 'OperatorHirn':
      walkArr(node.operands);
      break;
    case 'ReferenceHirn':
      if (typeof node.target !== 'string') walk(node.target);
      walk(node.property);
      walkArr(node.arguments_);
      break;
    case 'MatchHirn':
      walk(node.target);
      walkArr(node.branches);
      break;
    case 'BranchHirn':
      walk(node.pattern);
      walk(node.value);
      break;
    case 'LoopHirn':
      walk(node.condition);
      walk(node.block);
      break;
    case 'GoHirn':
      walk(node.value);
      break;
  }
}
