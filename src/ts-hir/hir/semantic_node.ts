import * as abstractions from '@razomy/abstractions';
import random from '@razomy/random';
import * as object_ from '@razomy/object';
import * as tsHir from "@razomy/ts-hir";

export abstract class SemanticNode implements abstractions.hir.IHirNode {
  public children: abstractions.meta.LateInit<abstractions.hir.IHirNode[]> = object_.LATE_INIT;
  public syntaxRole: abstractions.meta.LateInit<abstractions.translator.SyntaxRole> = object_.LATE_INIT;
  public semanticLayer: abstractions.meta.LateInit<abstractions.translator.SemanticLayer> = object_.LATE_INIT;
  public id: string = object_.LATE_INIT;
  public kind: string = object_.LATE_INIT;
  public next: abstractions.hir.IHirNode | null = object_.LATE_INIT;
  public prev: abstractions.hir.IHirNode | null = object_.LATE_INIT;
  public parent: abstractions.hir.IHirNode | null = object_.LATE_INIT;

  constructor(public ctx: tsHir.hir.SemanticContext) {
    this.id = random.createUuid();
  }

  get tsMorph(){
    const id = this.ctx.hirnToAsn.get(this.id)!.id;
    return this.ctx.asnToTsMorph.get(id)!;
  }
}

export abstract class IdentityNode extends SemanticNode implements abstractions.hir.IIdentityHirn {
  public name: string | null = object_.LATE_INIT;
  public abstract modifiers: abstractions.hir.IIdentityHirn['modifiers'];
  public abstract doc: { description: string | null };
}

export class LiteralSn extends SemanticNode implements abstractions.hir.LiteralHirn {
  public override kind: 'LiteralHirn' = 'LiteralHirn' as const;
  public value: any = object_.LATE_INIT;
}

export class OperatorSn extends SemanticNode implements abstractions.hir.OperatorHirn {
  public override kind: 'OperatorHirn' = 'OperatorHirn' as const;
  public operator: string = object_.LATE_INIT;
  public operands: abstractions.hir.HirnType[] = object_.LATE_INIT;
}

export abstract class IReferenceSn extends SemanticNode implements abstractions.hir.IReferenceHirn {
}


// 1. Ссылка на переменную
export class VarRefSn extends SemanticNode implements abstractions.hir.VarRefHirn {
  public override kind: 'VarRefHirn' = 'VarRefHirn' as const;
  public name: string = object_.LATE_INIT;
  public resolvedDeclaration: abstractions.hir.IdentityHirnType | null = null;

  public getSymbolName(): string {
    return this.name;
  }
}

// 2. Доступ к свойству
export class MemberAccessSn extends SemanticNode implements abstractions.hir.MemberAccessHirn {
  public override kind: 'MemberAccessHirn' = 'MemberAccessHirn' as const;
  public target: abstractions.hir.HirnType = object_.LATE_INIT;
  public property: abstractions.hir.HirnType = object_.LATE_INIT;
}

// 3. Вызов функции / метода
export class CallSn extends SemanticNode implements abstractions.hir.CallHirn {
  public override kind: 'CallHirn' = 'CallHirn' as const;
  public callee: abstractions.hir.HirnType = object_.LATE_INIT;
  public arguments_: abstractions.hir.HirnType[] = [];
}

export class BlockSn extends SemanticNode implements abstractions.hir.BlockHirn {
  public override kind: 'BlockHirn' = 'BlockHirn' as const;
  public statements: abstractions.hir.HirnType[] = object_.LATE_INIT;
}

export class MatchSn extends SemanticNode implements abstractions.hir.MatchHirn {
  public override kind: 'MatchHirn' = 'MatchHirn' as const;
  public target: abstractions.hir.HirnType = object_.LATE_INIT;
  public branches: abstractions.hir.BranchHirn[] = object_.LATE_INIT;
}

export class BranchSn extends SemanticNode implements abstractions.hir.BranchHirn {
  public override kind: 'BranchHirn' = 'BranchHirn' as const;
  public pattern: abstractions.hir.HirnType = object_.LATE_INIT;
  public value: abstractions.hir.HirnType = object_.LATE_INIT;
}

export class LoopSn extends SemanticNode implements abstractions.hir.LoopHirn {
  public override kind: 'LoopHirn' = 'LoopHirn' as const;
  public condition: abstractions.hir.HirnType | null = object_.LATE_INIT;
  public block: abstractions.hir.BlockHirn = object_.LATE_INIT;
}

export class GoSn extends SemanticNode implements abstractions.hir.GoHirn {
  public override kind: 'GoHirn' = 'GoHirn' as const;
  public operator: 'break' | 'continue' | 'yield' | 'return' | 'throw' = object_.LATE_INIT;
  public value: abstractions.hir.HirnType | null = object_.LATE_INIT;
}

export class BindingSn extends IdentityNode implements abstractions.hir.BindingHirn {
  public override kind: 'BindingHirn' = 'BindingHirn' as const;
  public shape: abstractions.hir.BindingHirn['shape'] | null = object_.LATE_INIT;
  public value: abstractions.hir.HirnType | null = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
  public modifiers: abstractions.hir.BindingHirn['modifiers'] = object_.LATE_INIT;
}

export class FunctionSn extends IdentityNode implements abstractions.hir.FunctionHirn {
  public override kind: 'FunctionHirn' = 'FunctionHirn' as const;
  public fnHashId: string = random.createUuid();
  public returnShape: abstractions.hir.FunctionHirn['returnShape'] = object_.LATE_INIT;
  public parameters: abstractions.hir.BindingHirn[] = object_.LATE_INIT;
  public modifiers: abstractions.hir.FunctionHirn['modifiers'] = object_.LATE_INIT;
  public block: abstractions.hir.HirnType | null = object_.LATE_INIT;
  public doc: {
    title: string | null;
    description: string | null;
    returnDescription: string | null;
    examples: abstractions.hir.FunctionDocExampleHirn[];
  } = object_.LATE_INIT;
}

export class StructSn extends IdentityNode implements abstractions.hir.StructHirn {
  public override kind: 'StructHirn' = 'StructHirn' as const;
  public properties: abstractions.hir.StructHirn['properties'] = object_.LATE_INIT;
  public modifiers: abstractions.hir.StructHirn['modifiers'] = object_.LATE_INIT;
  public doc: { description: string } = object_.LATE_INIT;
}

export class ModuleSn extends IdentityNode implements abstractions.hir.ModuleHirn {
  public override kind: 'ModuleHirn' = 'ModuleHirn' as const;
  public statements: abstractions.hir.ModuleHirn['statements'] = object_.LATE_INIT;
  public modifiers: abstractions.hir.ModuleHirn['modifiers'] = object_.LATE_INIT;
  public doc: abstractions.hir.ModuleHirn['doc'] = object_.LATE_INIT;
}


export type SnType =
  | LiteralSn
  | OperatorSn
  | VarRefSn
  | MemberAccessSn
  | CallSn
  | BlockSn
  | MatchSn
  | BranchSn
  | LoopSn
  | GoSn
  | BindingSn
  | FunctionSn
  | StructSn
  | ModuleSn
