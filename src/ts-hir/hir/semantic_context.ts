import * as abstractions from '@razomy/abstractions';
import type { Project, Node } from 'ts-morph';
import random from '@razomy/random';

export class SemanticContext implements abstractions.hir.IHirnCtx {
  constructor(
    public tsMorphRoot: Project,

    public asnRoot: abstractions.translator.AsnType = null as any,
    public hirRoot: abstractions.hir.HirnType = null as any,

    public tsMorphToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translator.AsnType>> = new Map(),
    public asnToTsMorph: Map<string, Node> = new Map(),

    public asnToHirn: Map<string, abstractions.patterns.IdRef<abstractions.hir.HirnType>> = new Map(),
    public hirnToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translator.AsnType>> = new Map(),

    public tsMorphMap = new Map<string, Node>(),
    public asnMap = new Map<string, abstractions.translator.AsnType>(),
    public hirnMap = new Map<string, abstractions.hir.HirnType>(),

    public id: string = random.createUuid(),
  ) {}
}
