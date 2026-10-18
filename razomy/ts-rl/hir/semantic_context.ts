import * as abstractions from '@razomy/abstractions';
import type { Project, Node } from 'ts-morph';
import random from '@razomy/random';

export class SemanticContext implements abstractions.translator.IHirnCtx {
  constructor(
    public tsMorphRoot: Project,

    public asnRoot: abstractions.translator.AsnType = null as any,
    public hirRoot: abstractions.translator.HirnType = null as any,

    public tsMorphToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translator.AsnType>> = new Map(),
    public asnToTsMorph: Map<string, Node> = new Map(),

    public asnToHirn: Map<string, abstractions.patterns.IdRef<abstractions.translator.HirnType>> = new Map(),
    public hirnToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translator.AsnType>> = new Map(),

    public tsMorphMap = new Map<string, Node>(),
    public asnMap = new Map<string, abstractions.translator.AsnType>(),
    public hirnMap = new Map<string, abstractions.translator.HirnType>(),

    public id: string = random.createUuid(),
  ) {}
}
