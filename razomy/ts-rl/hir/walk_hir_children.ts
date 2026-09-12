import * as abstracts from "@razomy/abstracts";

/**
 * ЕДИНАЯ БАЗА ОБХОДА (УТИЛИТА):
 * Отвечает ТОЛЬКО за знание того, в каких полях лежат дочерние узлы.
 * Используйте эту функцию во всех фазах, чтобы не дублировать огромный switch.
 */
export function walkHirChildren<T extends abstracts.translators.HirType>(
  node: T,
  onChild: (child: T) => void,
  onArray: (children: T[]) => void
) {
  // Локальные помощники делают код компактным
  function walk (child?: any) {
        if (child) onChild(child as T);
      }
  function walkArr (children?: any[]) {
        if (children && children.length > 0) onArray(children as T[]);
      }

  switch (node.kind) {
    case 'BlockHir':
      walkArr(node.statements);
      break;
    case 'FunctionHir':
      walkArr(node.modifiers);
      walk(node.returnShape);
      walkArr(node.parameters);
      walk(node.block);
      break;
    case 'StructHir':
      walkArr(node.modifiers);
      walkArr(node.properties);
      break;
    case 'BindingHir':
      walkArr(node.modifiers);
      walk(node.shape);
      walk(node.value);
      break;
    case 'OperatorHir':
      walkArr(node.operands);
      break;
    case 'ReferenceHir':
      if (typeof node.target !== 'string') walk(node.target);
      walk(node.property);
      walkArr(node.arguments_);
      break;
    case 'MatchHir':
      walk(node.target);
      walkArr(node.branches);
      break;
    case 'BranchHir':
      walk(node.pattern);
      walk(node.value);
      break;
    case 'LoopHir':
      walk(node.condition);
      walk(node.block);
      break;
    case 'GoHir':
      walk(node.value);
      break;
  }
}


