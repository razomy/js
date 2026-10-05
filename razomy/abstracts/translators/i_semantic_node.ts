import * as abstracts from '@razomy/abstracts';

/**
 * Semantic tree
 * Optimised for development
 */
export interface ISemanticNode<T = abstracts.translators.HirType>
  extends abstracts.patterns.ISyntax,
    abstracts.graphs.HasOrder<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasParent<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasChildren<abstracts.translators.ISemanticNode[] | null> {
  hir: T;
}

export interface ISemanticCtx extends abstracts.patterns.IContext {
  tsMorphToHir: Map<string, abstracts.patterns.IdRef<abstracts.translators.HirType>>;
  astToHir: Map<abstracts.patterns.IdRef<abstracts.translators.HirType>, abstracts.patterns.IdRef<abstracts.translators.HirType>>;
}
