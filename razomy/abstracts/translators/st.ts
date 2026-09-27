import * as abstracts from "@razomy/abstracts";

/**
 * Semantic tree
 * Optimised for development
 */
export interface ISemanticNode extends abstracts.domains.IEntity, abstracts.graphs.HasOrder<abstracts.translators.HirType | null>, abstracts.graphs.HasParent<abstracts.translators.HirType | null> {
  id: string;
  kind: string;
  syntaxLayer: abstracts.translators.SyntaxLayer;
  semanticLayer: abstracts.translators.SemanticLayer;
}
