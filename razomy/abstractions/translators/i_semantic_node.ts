import * as abstractions from '@razomy/abstractions';

/**
 * Semantic tree
 * Optimised for development
 */
export interface ISemanticNode<T = abstractions.translators.HirType>
  extends abstractions.patterns.ISyntax,
    abstractions.graphs.HasOrder<abstractions.translators.ISemanticNode | null>,
    abstractions.graphs.HasParent<abstractions.translators.ISemanticNode | null>,
    abstractions.graphs.HasChildren<abstractions.translators.ISemanticNode[] | null> {
  hir: T;
}

export interface ISemanticCtx extends abstractions.patterns.IContext {
  tsMorphToHir: Map<string, abstractions.patterns.IdRef<abstractions.translators.HirType>>;
  astToHir: Map<abstractions.patterns.IdRef<abstractions.translators.HirType>, abstractions.patterns.IdRef<abstractions.translators.HirType>>;
}
