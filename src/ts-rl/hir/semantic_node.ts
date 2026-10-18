import * as abstractions from '@razomy/abstractions';
import random from '@razomy/random';
import * as object_ from '@razomy/object';
import * as tsRl from '@razomy/ts-rl';

export abstract class SemanticNode implements abstractions.translator.IHirNode {
  public children: abstractions.meta.LateInit<abstractions.translator.IHirNode[]> = object_.LATE_INIT;
  public syntaxRole: abstractions.meta.LateInit<abstractions.translator.SyntaxRole> = object_.LATE_INIT;
  public semanticLayer: abstractions.meta.LateInit<abstractions.translator.SemanticLayer> = object_.LATE_INIT;
  public id: string = object_.LATE_INIT;
  public kind: string = object_.LATE_INIT;
  public next: abstractions.translator.IHirNode | null = object_.LATE_INIT;
  public prev: abstractions.translator.IHirNode | null = object_.LATE_INIT;
  public parent: abstractions.translator.IHirNode | null = object_.LATE_INIT;

  constructor(public ctx: tsRl.hir.SemanticContext) {
    this.id = random.createUuid();
  }

  get tsMorph(){
    const id = this.ctx.hirnToAsn.get(this.id)!.id;
    return this.ctx.asnToTsMorph.get(id)!;
  }
}

export abstract class IdentityNode extends SemanticNode implements abstractions.translator.IIdentityHirn {
  public name: string | null = object_.LATE_INIT;
  public modifiers: abstractions.translator.HirnType[] = object_.LATE_INIT;
  isPublic(): boolean {
    return this.modifiers.has((i) => i.kind === 'LiteralHirn' && i.value === 'public');
  }
}

export class LiteralSn extends SemanticNode implements abstractions.translator.LiteralHirn {
  public override kind: 'LiteralHirn' = 'LiteralHirn' as const;
  public value: any = object_.LATE_INIT;
}

export class OperatorSn extends SemanticNode implements abstractions.translator.OperatorHirn {
  public override kind: 'OperatorHirn' = 'OperatorHirn' as const;
  public operator: string = object_.LATE_INIT;
  public operands: abstractions.translator.HirnType[] = object_.LATE_INIT;
}

export class ReferenceSn extends SemanticNode implements abstractions.translator.ReferenceHirn {
  public override kind: 'ReferenceHirn' = 'ReferenceHirn' as const;
  public target: abstractions.translator.HirnType | null = object_.LATE_INIT;
  public property: abstractions.translator.HirnType | null = object_.LATE_INIT;
  public arguments_: abstractions.translator.HirnType[] = object_.LATE_INIT;

  /**
   * Вычисляемое поле: фактический узел декларации, на который указывает данная ссылка.
   * Вычисляется функцией resolveReferences().
   */
  public resolvedDeclaration: abstractions.translator.HirnType | null = object_.LATE_INIT;

  /**
   * Имя символа, на который ссылается Reference.
   */
  public getSymbolName(): string | null {
    if (!this.target) return null;
    if (this.target.kind === 'LiteralHirn') {
      return String((this.target as LiteralSn).value);
    }
    return null;
  }

  /**
   * Разрешена ли ссылка в объявление.
   */
  public isResolved(): boolean {
    return this.resolvedDeclaration !== null;
  }
}

export class BlockSn extends SemanticNode implements abstractions.translator.BlockHirn {
  public override kind: 'BlockHirn' = 'BlockHirn' as const;
  public statements: abstractions.translator.HirnType[] = object_.LATE_INIT;
}

export class MatchSn extends SemanticNode implements abstractions.translator.MatchHirn {
  public override kind: 'MatchHirn' = 'MatchHirn' as const;
  public target: abstractions.translator.HirnType = object_.LATE_INIT;
  public branches: abstractions.translator.BranchHirn[] = object_.LATE_INIT;
}

export class BranchSn extends SemanticNode implements abstractions.translator.BranchHirn {
  public override kind: 'BranchHirn' = 'BranchHirn' as const;
  public pattern: abstractions.translator.HirnType = object_.LATE_INIT;
  public value: abstractions.translator.HirnType = object_.LATE_INIT;
}

export class LoopSn extends SemanticNode implements abstractions.translator.LoopHirn {
  public override kind: 'LoopHirn' = 'LoopHirn' as const;
  public condition: abstractions.translator.HirnType | null = object_.LATE_INIT;
  public block: abstractions.translator.BlockHirn = object_.LATE_INIT;
}

export class GoSn extends SemanticNode implements abstractions.translator.GoHirn {
  public override kind: 'GoHirn' = 'GoHirn' as const;
  public operator: 'break' | 'continue' | 'yield' | 'return' | 'throw' = object_.LATE_INIT;
  public value: abstractions.translator.HirnType | null = object_.LATE_INIT;
}

export class BindingSn extends IdentityNode implements abstractions.translator.BindingHirn {
  public override kind: 'BindingHirn' = 'BindingHirn' as const;
  public shape: abstractions.translator.ReferenceHirn | null = object_.LATE_INIT;
  public value: abstractions.translator.HirnType | null = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}

export class FunctionSn extends IdentityNode implements abstractions.translator.FunctionHirn {
  public override kind: 'FunctionHirn' = 'FunctionHirn' as const;
  public fnHashId: string = random.createUuid();
  public returnShape: abstractions.translator.ReferenceHirn | null = object_.LATE_INIT;
  public parameters: abstractions.translator.BindingHirn[] = object_.LATE_INIT;
  public block: abstractions.translator.HirnType | null = object_.LATE_INIT;
  public doc: {
    title: string | null;
    description: string | null;
    returnDescription: string | null;
    examples: abstractions.translator.FunctionDocExampleHirn[];
  } = object_.LATE_INIT;
}

export class StructSn extends IdentityNode implements abstractions.translator.StructHirn {
  public override kind: 'StructHirn' = 'StructHirn' as const;
  public properties: abstractions.translator.HirnType[] = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}

export class ModuleSn extends IdentityNode implements abstractions.translator.ModuleHirn {
  public override kind: 'ModuleHirn' = 'ModuleHirn' as const;
  public properties: abstractions.translator.HirnType[] = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}


export type SnType =
  | LiteralSn
  | OperatorSn
  | ReferenceSn
  | BlockSn
  | MatchSn
  | BranchSn
  | LoopSn
  | GoSn
  | BindingSn
  | FunctionSn
  | StructSn
  | ModuleSn
