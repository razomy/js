import * as abstractions from '@razomy/abstractions';
import * as tsRl from "@razomy/ts-rl";

export class SemanticContext {
  public nodeMap = new Map<string, abstractions.translators.HirType>();
  public root : abstractions.translators.HirType = null as any;
  public semanticMap = new Map<string, tsRl.st.SemanticNode<any>>();

  public set(node: abstractions.translators.HirType): void {
    this.nodeMap.set(node.id, node);
  }

  /**
   * Разрешает IdRef или саму ноду в специализированный Семантический Узел
   */
  public getSemantic<T extends tsRl.st.SemanticNode<any> = any>(
    target: abstractions.patterns.IdRef<abstractions.translators.HirType>,
  ): T {
    const rawNode = this.nodeMap.get(target.id)!;
    if (this.semanticMap.has(rawNode.id)) {
      return this.semanticMap.get(rawNode.id) as T;
    }

    const semantic = tsRl.st.createSemanticNode(rawNode, this);
    this.semanticMap.set(rawNode.id, semantic);
    return semantic as T;
  }


  leave(a){
    return a
  }
  enter(a){
    return a
  }

}

