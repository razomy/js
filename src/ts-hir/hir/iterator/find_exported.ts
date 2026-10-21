import * as tsHir from "@razomy/ts-hir";

export function findExported(root: tsHir.hir.SnType): tsHir.hir.SnType[] {
    return tsHir.hir.iterator.findHirNodes<tsHir.hir.SnType>(root, function (node) {
    return (node.kind === 'StructHirn'
      || node.kind === 'FunctionHirn'
      || node.kind === 'BindingHirn'
    ) && node.modifiers.isPublic!!;
    });
}
