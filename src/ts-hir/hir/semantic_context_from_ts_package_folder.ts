import * as abstractions from '@razomy/abstractions';
import { Node, Project } from 'ts-morph';
import path from 'path';
import * as tsHir from "@razomy/ts-hir";

class TsMorphIterator implements abstractions.patterns.HasEnterLeave<abstractions.translator.AsnType> {
  constructor(public ctx: tsHir.hir.SemanticContext) {}
  enter(p, s: Node) {
    this.ctx.tsMorphMap.set(tsHir.tsMorph.getNodeId(s), s);
    this.ctx.tsMorphToAsn.set(tsHir.tsMorph.getNodeId(s), p);
    this.ctx.asnToTsMorph.set(p.id, s);
    this.ctx.asnMap.set(p.id, p);
    return p;
  }
  leave(p, _: Node) {
    return p;
  }
}

class AsnIterator implements abstractions.patterns.HasEnterLeave<abstractions.translator.HirnType> {
  constructor(public ctx: tsHir.hir.SemanticContext) {}
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

  const ctx = new tsHir.hir.SemanticContext(project);

  // 1. Построение ASN из ts-morph
  ctx.asnRoot = tsHir.as.parsePackage(project, dirPath, new TsMorphIterator(ctx))!;

  // 2. Первичный перевод ASN -> HIR (структурный скелет)
  ctx.hirRoot = tsHir.hir.astToHirNode(ctx, new AsnIterator(ctx), ctx.asnRoot);

  // 3. Последовательные фазы семантических вычислений:
  tsHir.hir.iterator.indexNodes(ctx, ctx.hirRoot); // 1. Индексация ID и карт
  tsHir.hir.iterator.linkHirTree(ctx, ctx.hirRoot); // 2. Связывание графа: parent / next / prev / children
  tsHir.hir.iterator.computeSemanticLayers(ctx, ctx.hirRoot); // 3. Вычисление semanticLayer (state / shape / generic / meta)
  tsHir.hir.iterator.resolveReferences(ctx, ctx.hirRoot); // 4. Разрешение ReferenceSn -> resolvedDeclaration
  tsHir.hir.iterator.joinDocs(ctx, ctx.hirRoot); // 5. Привязка документации к сущностям

  return ctx;
}
