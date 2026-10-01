import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export abstract class SemanticNode<T extends abstracts.translators.IHirNode>
  implements abstracts.translators.ISemanticNode<T>
{
   children: abstracts.translators.ISemanticNode[] | null = null;
   next: abstracts.translators.ISemanticNode | null = null;
   parent: abstracts.translators.ISemanticNode | null = null;
   prev: abstracts.translators.ISemanticNode | null = null;

  constructor(
    public hir: T,
    protected readonly ctx: tsRl.st.SemanticContext
  ) {}

  get id(): string {
    return this.hir.id;
  }

  get kind(): string {
    return this.hir.kind;
  }

  // Извлечение текстовых модификаторов (async, export, const...)
  protected extractModifiers(modifiers: abstracts.patterns.IdRef<abstracts.translators.HirType>[]): string[] {
    return (modifiers || [])
      .map((m) => this.ctx.getSemantic(m))
      .filter((m): m is LiteralNode => m instanceof LiteralNode)
      .map((m) => String(m.value));
  }
}

export class FunctionNode extends SemanticNode<abstracts.translators.FunctionHir> {
  get name(): string | null {
    return this.hir.name;
  }

  get isAnonymous(): boolean {
    return !this.hir.name;
  }
  get isAsync(): boolean {
    return this.modifiers.includes('async');
  }
  get isExported(): boolean {
    return this.modifiers.includes('export');
  }

  get modifiers(): string[] {
    return this.extractModifiers(this.hir.modifiers);
  }

  get parameters(): BindingNode[] {
    return this.hir.parameters
      .map((p) => this.ctx.getSemantic<BindingNode>(p))
      .filter((p): p is BindingNode => p !== null);
  }

  get returnType(): SemanticNode<any> | null {
    return this.ctx.getSemantic(this.hir.returnShape!);
  }

  get body(): SemanticNode<any> | null {
    return this.ctx.getSemantic(this.hir.block!);
  }

  // Человекочитаемая документация сразу строками
  get title(): string | null {
    return this.hir.doc?.title || null;
  }

  get description(): string | null {
    return this.hir.doc?.description || null;
  }
}

export class BindingNode extends SemanticNode<abstracts.translators.BindingHir> {
  get name(): string {
    return this.hir.name ?? '';
  }
  get isReadonly(): boolean {
    return this.modifiers.includes('readonly');
  }

  get modifiers(): string[] {
    return this.extractModifiers(this.hir.modifiers);
  }

  get type(): SemanticNode<any> | null {
    return this.ctx.getSemantic(this.hir.shape!);
  }

  get value(): SemanticNode<any> | null {
    return this.ctx.getSemantic(this.hir.value!);
  }
}

export class ModuleNode extends SemanticNode<abstracts.translators.StructHir> {
  get name(): string {
    return this.hir.name ?? 'anonymous_module';
  }

  // Все декларации внутри модуля
  get declarations(): SemanticNode<any>[] {
    return this.hir.properties.map((p) => this.ctx.getSemantic(p)).filter((p): p is SemanticNode<any> => p !== null);
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
    return this.hir.name ?? 'AnonymousClass';
  }

  get isAbstract(): boolean {
    return this.extractModifiers(this.hir.modifiers).includes('abstract');
  }

  get members(): SemanticNode<any>[] {
    return this.hir.properties.map((p) => this.ctx.getSemantic(p)).filter((p): p is SemanticNode<any> => p !== null);
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
    return this.hir.properties.map((p) => this.ctx.getSemantic(p)).filter((p): p is SemanticNode<any> => p !== null);
  }

  get length(): number {
    return this.hir.properties.length;
  }
}

export class LiteralNode extends SemanticNode<abstracts.translators.LiteralHir> {
  get value(): any {
    return this.hir.value;
  }
  get asString(): string {
    return String(this.hir.value);
  }
  get asNumber(): number {
    return Number(this.hir.value);
  }
}

export function createSemanticNode(
  node: abstracts.translators.HirType,
  ctx: tsRl.st.SemanticContext,
): SemanticNode<abstracts.translators.HirType> {
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
        const res = ctx.getSemantic<LiteralNode>(m);
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
