import * as abstractions from '@razomy/abstractions';
import { Node, Project } from 'ts-morph';
import path from 'path';
import * as tsRl from '@razomy/ts-rl';

class TsMorphIterator implements abstractions.patterns.HasEnterLeave<abstractions.translator.AsnType> {
  constructor(public ctx: tsRl.hir.SemanticContext) {}
  enter(p, s: Node) {
    this.ctx.tsMorphMap.set(tsRl.tsMorph.getNodeId(s), s);
    this.ctx.tsMorphToAsn.set(tsRl.tsMorph.getNodeId(s), p);
    this.ctx.asnToTsMorph.set(p.id, s);
    this.ctx.asnMap.set(p.id, p);
    return p;
  }
  leave(p, _: Node) {
    return p;
  }
}

class AsnIterator implements abstractions.patterns.HasEnterLeave<abstractions.translator.HirnType> {
  constructor(public ctx: tsRl.hir.SemanticContext) {}
  enter(p, s: abstractions.translator.AsnType) {
    this.ctx.asnToHirn.set(s.id, p);
    this.ctx.hirnToAsn.set(p.id, s);
    return p;
  }
  leave(p, _: Node) {
    return p;
  }
}

export function semanticContextFromTsPackageFolder(dirPath: abstractions.fs.DirPath) {
  const project = new Project({ tsConfigFilePath: '../../' + 'tsconfig.json' });
  project.addSourceFileAtPath(path.join(dirPath, 'package.json'));

  const ctx = new tsRl.hir.SemanticContext(project);

  // 1. Построение ASN из ts-morph
  ctx.asnRoot = tsRl.as.parsePackage(project, dirPath, new TsMorphIterator(ctx))!;

  // 2. Первичный перевод ASN -> HIR (структурный скелет)
  ctx.hirRoot = tsRl.hir.astToHirNode(ctx, new AsnIterator(ctx), ctx.asnRoot);

  // 3. Последовательные фазы семантических вычислений:
  tsRl.hir.iterator.indexNodes(ctx, ctx.hirRoot); // 1. Индексация ID и карт
  tsRl.hir.iterator.linkHirTree(ctx, ctx.hirRoot); // 2. Связывание графа: parent / next / prev / children
  tsRl.hir.iterator.computeSemanticLayers(ctx, ctx.hirRoot); // 3. Вычисление semanticLayer (state / shape / generic / meta)
  tsRl.hir.iterator.resolveReferences(ctx, ctx.hirRoot); // 4. Разрешение ReferenceSn -> resolvedDeclaration
  tsRl.hir.iterator.joinDocs(ctx, ctx.hirRoot); // 5. Привязка документации к сущностям

  return ctx;
}
