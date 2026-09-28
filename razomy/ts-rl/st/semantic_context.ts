import * as abstracts from '@razomy/abstracts';
import { Project } from 'ts-morph';
import path from 'path';
import * as tsRl from '@razomy/ts-rl';

export class SemanticContext {
  private nodeMap = new Map<string, abstracts.translators.HirType>();
  private semanticCache = new Map<string, SemanticNode<any>>();

  constructor(nodes?: abstracts.translators.HirType[]) {
    if (nodes) {
      for (const node of nodes) this.register(node);
    }
  }

  public register(node: abstracts.translators.HirType): void {
    this.nodeMap.set(node.id, node);
  }

  /**
   * Разрешает IdRef или саму ноду в специализированный Семантический Узел
   */
  public resolve<T extends SemanticNode<any> = SemanticNode<any>>(
    target: abstracts.domains.IdRef<abstracts.translators.HirType> | abstracts.translators.HirType | null | undefined,
  ): T | null {
    if (!target) return null;

    const rawNode: abstracts.translators.HirType | undefined =
      typeof target === 'string'
        ? this.nodeMap.get(target)
        : 'id' in target && this.nodeMap.has(target.id)
        ? this.nodeMap.get(target.id)
        : (target as abstracts.translators.HirType);

    if (!rawNode) return null;

    if (this.semanticCache.has(rawNode.id)) {
      return this.semanticCache.get(rawNode.id) as T;
    }

    const semantic = createSemanticNode(rawNode, this);
    this.semanticCache.set(rawNode.id, semantic);
    return semantic as T;
  }
}

export abstract class SemanticNode<T extends abstracts.translators.IHirNode> {
  constructor(public readonly raw: T, protected readonly ctx: SemanticContext) {}

  get id(): string {
    return this.raw.id;
  }
  get kind(): string {
    return this.raw.kind;
  }

  // Извлечение текстовых модификаторов (async, export, const...)
  protected extractModifiers(modifiers: abstracts.domains.IdRef<abstracts.translators.HirType>[]): string[] {
    return (modifiers || [])
      .map((m) => this.ctx.resolve(m))
      .filter((m): m is LiteralNode => m instanceof LiteralNode)
      .map((m) => String(m.value));
  }
}

export class FunctionNode extends SemanticNode<abstracts.translators.FunctionHir> {
  get name(): string | null {
    return this.raw.name;
  }

  get isAnonymous(): boolean {
    return !this.raw.name;
  }
  get isAsync(): boolean {
    return this.modifiers.includes('async');
  }
  get isExported(): boolean {
    return this.modifiers.includes('export');
  }

  get modifiers(): string[] {
    return this.extractModifiers(this.raw.modifiers);
  }

  get parameters(): BindingNode[] {
    return this.raw.parameters.map((p) => this.ctx.resolve<BindingNode>(p)).filter((p): p is BindingNode => p !== null);
  }

  get returnType(): SemanticNode<any> | null {
    return this.ctx.resolve(this.raw.returnShape);
  }

  get body(): SemanticNode<any> | null {
    return this.ctx.resolve(this.raw.block);
  }

  // Человекочитаемая документация сразу строками
  get title(): string | null {
    const node = this.ctx.resolve<LiteralNode>(this.raw.title);
    return node ? String(node.value) : null;
  }

  get description(): string | null {
    const node = this.ctx.resolve<LiteralNode>(this.raw.description);
    return node ? String(node.value) : null;
  }
}

export class BindingNode extends SemanticNode<abstracts.translators.BindingHir> {
  get name(): string {
    return this.raw.name ?? '';
  }
  get isReadonly(): boolean {
    return this.modifiers.includes('readonly');
  }

  get modifiers(): string[] {
    return this.extractModifiers(this.raw.modifiers);
  }

  get type(): SemanticNode<any> | null {
    return this.ctx.resolve(this.raw.shape);
  }

  get value(): SemanticNode<any> | null {
    return this.ctx.resolve(this.raw.value);
  }
}

export class ModuleNode extends SemanticNode<abstracts.translators.StructHir> {
  get name(): string {
    return this.raw.name ?? 'anonymous_module';
  }

  // Все декларации внутри модуля
  get declarations(): SemanticNode<any>[] {
    return this.raw.properties.map((p) => this.ctx.resolve(p)).filter((p): p is SemanticNode<any> => p !== null);
  }

  // Быстрый фильтр только функций модуля
  get functions(): FunctionNode[] {
    return this.declarations.filter((d): d is FunctionNode => d instanceof FunctionNode);
  }

  // Быстрый фильтр классов модуля
  get classes(): ClassNode[] {
    return this.declarations.filter((d): d is ClassNode => d instanceof ClassNode);
  }

  // Поиск декларации по имени
  public find(name: string): SemanticNode<any> | undefined {
    return this.declarations.find((d) => 'name' in d && (d as any).name === name);
  }
}

export class ClassNode extends SemanticNode<abstracts.translators.StructHir> {
  get name(): string {
    return this.raw.name ?? 'AnonymousClass';
  }

  get isAbstract(): boolean {
    return this.extractModifiers(this.raw.modifiers).includes('abstract');
  }

  get members(): SemanticNode<any>[] {
    return this.raw.properties.map((p) => this.ctx.resolve(p)).filter((p): p is SemanticNode<any> => p !== null);
  }

  // Поля класса (BindingHir)
  get fields(): BindingNode[] {
    return this.members.filter((m): m is BindingNode => m instanceof BindingNode);
  }

  // Методы класса (FunctionHir)
  get methods(): FunctionNode[] {
    return this.members.filter((m): m is FunctionNode => m instanceof FunctionNode);
  }

  public getMethod(name: string): FunctionNode | undefined {
    return this.methods.find((m) => m.name === name);
  }
}

export class ArrayNode extends SemanticNode<abstracts.translators.StructHir> {
  get elements(): SemanticNode<any>[] {
    return this.raw.properties.map((p) => this.ctx.resolve(p)).filter((p): p is SemanticNode<any> => p !== null);
  }

  get length(): number {
    return this.raw.properties.length;
  }
}

export class LiteralNode extends SemanticNode<abstracts.translators.LiteralHir> {
  get value(): any {
    return this.raw.value;
  }
  get asString(): string {
    return String(this.raw.value);
  }
  get asNumber(): number {
    return Number(this.raw.value);
  }
}

export function createSemanticNode(node: abstracts.translators.HirType, ctx: SemanticContext): SemanticNode<any> {
  switch (node.kind) {
    case 'FunctionHir':
      return new FunctionNode(node, ctx);

    case 'BindingHir':
      return new BindingNode(node, ctx);

    case 'LiteralHir':
      return new LiteralNode(node, ctx);

    case 'StructHir': {
      // 1. Проверяем модификаторы на маркер модуля
      const isModule = node.modifiers.some((m) => {
        const res = ctx.resolve<LiteralNode>(m);
        return res?.value === 'module';
      });
      if (isModule) return new ModuleNode(node, ctx);

      // 2. Если имени нет — это Array/Tuple
      if (!node.name) {
        return new ArrayNode(node, ctx);
      }

      // 3. Иначе это Класс/Интерфейс/Структура
      return new ClassNode(node, ctx);
    }

    default:
      // Базовая заглушка для остальных нод (Loop, Match, Go...)
      return new (class extends SemanticNode<any> {})(node, ctx);
  }
}

