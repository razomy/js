import * as abstractions from '@razomy/abstractions';
import random from '@razomy/random';
import * as object_ from '@razomy/object';
import * as tsRl from '@razomy/ts-rl';

export abstract class SemanticNode implements abstractions.translators.IHirNode {
  public children: abstractions.meta.LateInit<abstractions.translators.IHirNode[]> = object_.LATE_INIT;
  public syntaxRole: abstractions.meta.LateInit<abstractions.translators.SyntaxRole> = object_.LATE_INIT;
  public semanticLayer: abstractions.meta.LateInit<abstractions.translators.SemanticLayer> = object_.LATE_INIT;
  public id: string = object_.LATE_INIT;
  public kind: string = object_.LATE_INIT;
  public next: abstractions.translators.IHirNode | null = object_.LATE_INIT;
  public prev: abstractions.translators.IHirNode | null = object_.LATE_INIT;
  public parent: abstractions.translators.IHirNode | null = object_.LATE_INIT;

  constructor(public ctx: tsRl.hir.SemanticContext) {
    this.id = random.createUuid();
  }

  get tsMorph(){
    const id = this.ctx.hirnToAsn.get(this.id)!.id;
    return this.ctx.asnToTsMorph.get(id)!;
  }
}

export abstract class IdentityNode extends SemanticNode implements abstractions.translators.IIdentityHirn {
  public name: string | null = object_.LATE_INIT;
  public modifiers: abstractions.translators.HirnType[] = object_.LATE_INIT;
  isPublic(): boolean {
    return this.modifiers.has((i) => i.kind === 'LiteralHirn' && i.value === 'public');
  }
}

export class LiteralSn extends SemanticNode implements abstractions.translators.LiteralHirn {
  public override kind: 'LiteralHirn' = 'LiteralHirn';
  public value: any = object_.LATE_INIT;
}

export class OperatorSn extends SemanticNode implements abstractions.translators.OperatorHirn {
  public override kind: 'OperatorHirn' = 'OperatorHirn';
  public operator: string = object_.LATE_INIT;
  public operands: abstractions.translators.HirnType[] = object_.LATE_INIT;
}

export class ReferenceSn extends SemanticNode implements abstractions.translators.ReferenceHirn {
  public override kind: 'ReferenceHirn' = 'ReferenceHirn';
  public target: abstractions.translators.HirnType | null = object_.LATE_INIT;
  public property: abstractions.translators.HirnType | null = object_.LATE_INIT;
  public arguments_: abstractions.translators.HirnType[] = object_.LATE_INIT;

  /**
   * Вычисляемое поле: фактический узел декларации, на который указывает данная ссылка.
   * Вычисляется функцией resolveReferences().
   */
  public resolvedDeclaration: abstractions.translators.HirnType | null = object_.LATE_INIT;

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

export class BlockSn extends SemanticNode implements abstractions.translators.BlockHirn {
  public override kind: 'BlockHirn' = 'BlockHirn';
  public statements: abstractions.translators.HirnType[] = object_.LATE_INIT;
}

export class MatchSn extends SemanticNode implements abstractions.translators.MatchHirn {
  public override kind: 'MatchHirn' = 'MatchHirn';
  public target: abstractions.translators.HirnType = object_.LATE_INIT;
  public branches: abstractions.translators.BranchHirn[] = object_.LATE_INIT;
}

export class BranchSn extends SemanticNode implements abstractions.translators.BranchHirn {
  public override kind: 'BranchHirn' = 'BranchHirn';
  public pattern: abstractions.translators.HirnType = object_.LATE_INIT;
  public value: abstractions.translators.HirnType = object_.LATE_INIT;
}

export class LoopSn extends SemanticNode implements abstractions.translators.LoopHirn {
  public override kind: 'LoopHirn' = 'LoopHirn';
  public condition: abstractions.translators.HirnType | null = object_.LATE_INIT;
  public block: abstractions.translators.BlockHirn = object_.LATE_INIT;
}

export class GoSn extends SemanticNode implements abstractions.translators.GoHirn {
  public override kind: 'GoHirn' = 'GoHirn';
  public operator: 'break' | 'continue' | 'yield' | 'return' | 'throw' = object_.LATE_INIT;
  public value: abstractions.translators.HirnType | null = object_.LATE_INIT;
}

export class BindingSn extends IdentityNode implements abstractions.translators.BindingHirn {
  public override kind: 'BindingHirn' = 'BindingHirn';
  public shape: abstractions.translators.ReferenceHirn | null = object_.LATE_INIT;
  public value: abstractions.translators.HirnType | null = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}

export class FunctionSn extends IdentityNode implements abstractions.translators.FunctionHirn {
  public override kind: 'FunctionHirn' = 'FunctionHirn';
  public fnHashId: string = random.createUuid();
  public returnShape: abstractions.translators.ReferenceHirn | null = object_.LATE_INIT;
  public parameters: abstractions.translators.BindingHirn[] = object_.LATE_INIT;
  public block: abstractions.translators.HirnType | null = object_.LATE_INIT;
  public doc: {
    title: string | null;
    description: string | null;
    returnDescription: string | null;
    examples: abstractions.translators.FunctionDocExampleHirn[];
  } = object_.LATE_INIT;
}

export class StructSn extends IdentityNode implements abstractions.translators.StructHirn {
  public override kind: 'StructHirn' = 'StructHirn';
  public properties: abstractions.translators.HirnType[] = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}

export class ModuleSn extends IdentityNode implements abstractions.translators.ModuleHirn {
  public override kind: 'ModuleHirn' = 'ModuleHirn';
  public properties: abstractions.translators.HirnType[] = object_.LATE_INIT;
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
