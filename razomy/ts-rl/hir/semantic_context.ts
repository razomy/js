import * as abstractions from '@razomy/abstractions';
import type { Project, Node } from 'ts-morph';
import random from '@razomy/random';

export class SemanticContext implements abstractions.translators.IHirnCtx {
  constructor(
    public tsMorphRoot: Project,

    public asnRoot: abstractions.translators.AsnType = null as any,
    public hirRoot: abstractions.translators.HirnType = null as any,

    public tsMorphToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translators.AsnType>> = new Map(),
    public asnToTsMorph: Map<string, Node> = new Map(),

    public asnToHirn: Map<string, abstractions.patterns.IdRef<abstractions.translators.HirnType>> = new Map(),
    public hirnToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translators.AsnType>> = new Map(),

    public tsMorphMap = new Map<string, Node>(),
    public asnMap = new Map<string, abstractions.translators.AsnType>(),
    public hirnMap = new Map<string, abstractions.translators.HirnType>(),

    public id: string = random.createUuid(),
  ) {}
}
