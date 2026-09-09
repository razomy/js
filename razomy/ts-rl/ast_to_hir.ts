import * as abstracts from '@razomy/abstracts';
import type {
  AliasAst,
  ArgumentMemberAst,
  ArrayAst,
  AssignAst,
  AssignHir,
  AstType,
  BinaryAst,
  BinaryHir,
  BindingHir,
  BlockAst,
  BlockHir,
  BreakAst,
  CallAst,
  CallHir,
  CastHir,
  ClassAst,
  ContinueAst,
  DocsAst,
  DoWhileAst,
  ForIAst,
  ForItAst,
  ForOfAst,
  FunctionAst,
  FunctionDocsAst,
  FunctionHir,
  GoHir,
  HirType,
  IfAst,
  IModifierAst,
  ImportAst,
  InstanceAst,
  InterfaceAst,
  LambdaAst,
  LayerHir,
  LiteralAst,
  LiteralHir,
  LoopHir,
  MatchArmHir,
  MatchHir,
  MemberAst,
  MemberHir,
  ModifierHir,
  ModuleAst,
  ModuleHir,
  ObjectAst,
  ObjectHir,
  ParameterAst,
  ReferenceAst,
  ReferenceHir,
  ReturnAst,
  ReturnHir,
  SequenceHir,
  ShapingAst,
  SpreadAst,
  StructAst,
  StructHir,
  SwitchAst,
  SymbolId,
  SyntaxLayer,
  TemplateAst,
  TemplateHir,
  TernaryAst,
  ThrowAst,
  TryAst,
  TupleAst,
  UnaryAst,
  UnaryHir,
  WhileDoAst,
  YieldAst,
  YieldHir
} from '@razomy/abstracts/translators';

/**
 * Главный класс трансформации AST в унифицированный HIR
 */
export class HirCtx {
  private readonly docs = new Map<SymbolId, LayerHir>();
  private nextId: SymbolId = 1;
  private scopes: Map<string, SymbolId>[] = [new Map()];

  public register(symbolId: SymbolId, doc: LayerHir): void {
    this.docs.set(symbolId, doc);
  }

  public getDoc(symbolId: SymbolId): abstracts.meta.NullOptional<LayerHir> {
    return this.docs.get(symbolId) || null;
  }

  public createSymbol(): SymbolId {
    return this.nextId++;
  }

  public pushScope(): void {
    this.scopes.push(new Map());
  }

  public popScope(): void {
    this.scopes.pop();
  }

  public define(name: string): SymbolId {
    const id = this.nextId++;
    this.scopes[this.scopes.length - 1].set(name, id);
    return id;
  }

  public resolve(name: string): SymbolId {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const id = this.scopes[i].get(name);
      if (id !== undefined) {
        return id;
      }
    }
    // Глобальный фолбэк для неразрешенных имен
    const globalId = this.nextId++;
    this.scopes[0].set(name, globalId);
    return globalId;
  }
}

export function astToHir(ctx: HirCtx, node: abstracts.meta.NullOptional<AstType>): HirType {
  if (!node || !node.kind) {
    return {
      kind: 'LiteralHir',
      symbolId: ctx.createSymbol(),
      syntaxLayer: 2,
      semanticLayer: 1,
      value: null
    } as LiteralHir;
  }

  const baseLayer: SyntaxLayer = node.syntaxLayer ?? 2;

  switch (node.kind) {
    // ==========================================
    // 0. PANIC
    // ==========================================
    case 'TryAst': {
      const n = node as TryAst;
      return {
        kind: 'TryCatchHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        tryBlock: astToHir(ctx, n.block) as BlockHir,
        catches: [],
        finallyBlock: null
      };
    }

    case 'ThrowAst': {
      const n = node as ThrowAst;
      return {
        kind: 'ThrowHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        value: astToHir(ctx, n.value)
      };
    }

    // ==========================================
    // 1. STATE (VALUES & LITERALS)
    // ==========================================
    case 'LiteralAst': {
      const n = node as LiteralAst;
      return {
        kind: 'LiteralHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        value: n.value
      } as LiteralHir;
    }

    case 'TemplateAst': {
      const n = node as TemplateAst;
      return {
        kind: 'TemplateHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        values: n.values.map(v => astToHir(ctx, v))
      } as TemplateHir;
    }

    // Массивы и Кортежи унифицированы в SequenceHir
    case 'ArrayAst':
    case 'TupleAst': {
      const n = node as ArrayAst | TupleAst;
      return {
        kind: 'SequenceHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        elements: n.values.map(v => astToHir(ctx, v))
      } as SequenceHir;
    }

    // Объекты и Mapped-типы унифицированы в ObjectHir
    case 'ObjectAst': {
      const n = node as ObjectAst;
      return {
        kind: 'ObjectHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        entries: n.properties.map(p => ({
          key: {
            kind: 'LiteralHir',
            symbolId: ctx.define(p.identifier.name),
            syntaxLayer: 2,
            semanticLayer: 1,
            value: p.identifier.name
          } as LiteralHir,
          value: astToHir(ctx, p.value)
        }))
      } as ObjectHir;
    }

    // ==========================================
    // 2. OPERATIONS
    // ==========================================
    case 'UnaryAst': {
      const n = node as UnaryAst;
      return {
        kind: 'UnaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator,
        operand: astToHir(ctx, n.value),
        isPrefix: n.isPrefix
      } as UnaryHir;
    }

    case 'SpreadAst': {
      const n = node as SpreadAst;
      return {
        kind: 'UnaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: 'spread',
        operand: astToHir(ctx, n.value),
        isPrefix: true
      } as UnaryHir;
    }

    case 'ShapingAst': {
      const n = node as ShapingAst;
      return {
        kind: 'CastHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator === 'typeof' ? 'typeof' : 'as',
        targetShape: astToHir(ctx, n.value),
        value: astToHir(ctx, n.value)
      } as CastHir;
    }

    case 'BinaryAst': {
      const n = node as BinaryAst;
      return {
        kind: 'BinaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator,
        left: astToHir(ctx, n.left),
        right: astToHir(ctx, n.right)
      } as BinaryHir;
    }

    // ==========================================
    // 3. FLOW (IF / SWITCH / TERNARY -> MATCH)
    // ==========================================
    case 'IfAst':
    case 'TernaryAst': {
      const n = node as IfAst | TernaryAst;
      return {
        kind: 'MatchHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        target: null,
        arms: n.branches.map(b => {
          const isCond = b.kind === 'ConditionBranchAst';
          return {
            kind: 'MatchArmHir',
            symbolId: ctx.createSymbol(),
            syntaxLayer: baseLayer,
            pattern: isCond ? astToHir(ctx, (b as any).pattern) : null,
            block: astToHir(ctx, (b as any).value)
          } as MatchArmHir;
        })
      } as MatchHir;
    }

    case 'SwitchAst': {
      const n = node as SwitchAst;
      return {
        kind: 'MatchHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        target: astToHir(ctx, n.target),
        arms: n.branches.map(b => {
          const isMatch = b.kind === 'SwitchBranchAst';
          return {
            kind: 'MatchArmHir',
            symbolId: ctx.createSymbol(),
            syntaxLayer: baseLayer,
            pattern: isMatch ? astToHir(ctx, (b as any).pattern) : null,
            block: astToHir(ctx, (b as any).value)
          } as MatchArmHir;
        })
      } as MatchHir;
    }

    // ==========================================
    // 3. FLOW (LOOPS -> LOOPHIR)
    // ==========================================
    case 'WhileDoAst': {
      const n = node as WhileDoAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: null,
        condition: astToHir(ctx, n.condition),
        update: null,
        block: astToHir(ctx, n.block) as BlockHir,
        isPostCondition: false
      } as LoopHir;
    }

    case 'DoWhileAst': {
      const n = node as DoWhileAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: null,
        condition: astToHir(ctx, n.condition),
        update: null,
        block: astToHir(ctx, n.block) as BlockHir,
        isPostCondition: true
      } as LoopHir;
    }

    case 'ForInAst': // ForIAst
    case 'ForItAst': {
      const n = node as ForIAst | ForItAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: n.init ? astToHir(ctx, n.init) : null,
        condition: n.condition ? astToHir(ctx, n.condition) : null,
        update: n.update ? astToHir(ctx, n.update) : null,
        block: astToHir(ctx, n.block) as BlockHir,
        isPostCondition: false
      } as LoopHir;
    }

    case 'ForOfAst': {
      const n = node as ForOfAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: astToHir(ctx, n.init),
        condition: null,
        update: null,
        block: astToHir(ctx, n.block) as BlockHir,
        isPostCondition: false
      } as LoopHir;
    }

    // ==========================================
    // 3. FLOW (BLOCKS & JUMPS)
    // ==========================================
    case 'BlockAst': {
      const n = node as BlockAst;
      ctx.pushScope();
      const statements = n.statements.map(s => astToHir(ctx, s));
      ctx.popScope();
      return {
        kind: 'BlockHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        type: 'value',
        statements
      } as BlockHir;
    }

    case 'ReturnAst': {
      const n = node as ReturnAst;
      return {
        kind: 'ReturnHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        value: n.value ? astToHir(ctx, n.value) : null
      } as ReturnHir;
    }

    case 'BreakAst': {
      const n = node as BreakAst;
      return {
        kind: 'GoHir',
        type: 'break',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetLoopSymbol: n.identifier ? ctx.resolve(n.identifier.name) : null
      } as GoHir;
    }

    case 'ContinueAst': {
      const n = node as ContinueAst;
      return {
        kind: 'GoHir',
        type: 'continue',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetLoopSymbol: n.identifier ? ctx.resolve(n.identifier.name) : null
      } as GoHir;
    }

    case 'YieldAst': {
      const n = node as YieldAst;
      return {
        kind: 'YieldHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        value: n.value ? astToHir(ctx, n.value) : null,
        isDelegate: false
      } as YieldHir;
    }

    // ==========================================
    // 4. DECLARATIONS & FUNCTIONS
    // ==========================================
    case 'ParameterAst': {
      const n = node as ParameterAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: modifiersAstToHir(ctx, n.modifiers),
        shape: n.shape ? astToHir(ctx, n.shape) : null,
        value: n.value ? astToHir(ctx, n.value) : null,
        externalSource: null
      } as BindingHir;
    }

    case 'FunctionAst':
    case 'LambdaAst': {
      const n = node as FunctionAst | LambdaAst;
      const fnName = (n as FunctionAst).identifier ? (n as FunctionAst).identifier.name : 'anonymous';
      const fnSymbol = ctx.define(fnName);

      ctx.pushScope();
      const parameters = n.parameters.map(p => astToHir(ctx, p) as BindingHir);
      const block = astToHir(ctx, n.block) as BlockHir;
      ctx.popScope();

      return {
        kind: 'FunctionHir',
        symbolId: fnSymbol,
        syntaxLayer: baseLayer,
        modifiers: modifiersAstToHir(ctx, n.modifiers),
        parameters,
        returnShape: n.returnShape ? astToHir(ctx, n.returnShape) : null,
        block
      } as FunctionHir;
    }

    // Struct, Interface, Class унифицированы в ShapeDeclarationHir
    case 'StructAst':
    case 'InterfaceAst':
    case 'ClassAst': {
      const n = node as StructAst | InterfaceAst | ClassAst;
      const shapeSymbol = ctx.define(n.identifier.name);

      ctx.pushScope();
      const fields: Record<string, HirType> = {};
      n.properties.forEach(p => {
        fields[p.identifier.name] = astToHir(ctx, p.value);
      });

      const methods = ((n as ClassAst).methods || []).map(m => astToHir(ctx, m) as FunctionHir);
      ctx.popScope();

      return {
        kind: 'StructHir',
        symbolId: shapeSymbol,
        syntaxLayer: baseLayer,
        modifiers: modifiersAstToHir(ctx, n.modifiers),
        extendsShapes: [],
        fields,
        methods
      } as StructHir;
    }

    case 'ModuleAst': {
      const n = node as ModuleAst;
      const modSymbol = ctx.define(n.identifier.name);
      return {
        kind: 'ModuleHir',
        symbolId: modSymbol,
        syntaxLayer: baseLayer,
        identifier: n.identifier.name,
        role: n.role,
        version: n.version,
        block: astToHir(ctx, n.block) as BlockHir
      } as ModuleHir;
    }

    // ==========================================
    // 5. BINDINGS
    // ==========================================
    case 'InstanceAst': {
      const n = node as InstanceAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: modifiersAstToHir(ctx, n.modifiers),
        shape: n.shape ? astToHir(ctx, n.shape) : null,
        value: astToHir(ctx, n.value),
        externalSource: null
      } as BindingHir;
    }

    case 'AliasAst': {
      const n = node as AliasAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: modifiersAstToHir(ctx, n.modifiers),
        shape: null,
        value: astToHir(ctx, n.value),
        externalSource: null
      } as BindingHir;
    }

    case 'ImportAst': {
      const n = node as ImportAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        identifier: n.identifier.name,
        syntaxLayer: baseLayer,
        modifiers: [],
        shape: null,
        value: null,
        externalSource: {
          path: n.path,
          version: n.version
        }
      } as BindingHir;
    }

    case 'AssignAst': {
      const n = node as AssignAst;
      const targetSym = ctx.resolve(n.identifier.name);
      return {
        kind: 'AssignHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        target: {
          kind: 'ReferenceHir',
          symbolId: ctx.createSymbol(),
          syntaxLayer: 2,
          targetSymbol: targetSym
        } as ReferenceHir,
        value: astToHir(ctx, n.value)
      } as AssignHir;
    }

    // ==========================================
    // 6. ACCESS
    // ==========================================
    case 'ReferenceAst': {
      const n = node as ReferenceAst;
      return {
        kind: 'ReferenceHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetSymbol: ctx.resolve(n.identifier.name)
      } as ReferenceHir;
    }

    // Доступ по свойству и аргументу унифицирован в MemberHir
    case 'MemberAst':
    case 'ArgumentMemberAst': {
      const n = node as MemberAst | ArgumentMemberAst;
      const target = (n as MemberAst).object_ ?? (n as ArgumentMemberAst).argument;
      return {
        kind: 'MemberHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        target: astToHir(ctx, target),
        property: astToHir(ctx, n.property)
      } as MemberHir;
    }

    case 'CallAst':
    case 'MacroCallAst': {
      const n = node as CallAst;
      const callee = n.identifier
        ? {
          kind: 'ReferenceHir',
          symbolId: ctx.createSymbol(),
          syntaxLayer: 2,
          targetSymbol: ctx.resolve(n.identifier.name)
        } as ReferenceHir
        : {
          kind: 'LiteralHir',
          symbolId: ctx.createSymbol(),
          syntaxLayer: 2,
          semanticLayer: 1,
          value: null
        } as LiteralHir;

      return {
        kind: 'CallHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        callee,
        arguments_: (n.arguments_ || []).map(a => astToHir(ctx, a as AstType))
      } as CallHir;
    }

    // ==========================================
    // 7. LAYERS & DOCUMENTATION
    // ==========================================
    case 'FunctionDocsAst': {
      const n = node as FunctionDocsAst;
      const sym = ctx.createSymbol();
      const docNode: LayerHir = {
        kind: 'LayerHir',
        symbolId: sym,
        syntaxLayer: 1,
        title: n.title,
        description: n.description ?? null,
        annotations: {
          parameters: n.parameters,
          performance: n.performance,
          examples: n.examples
        }
      };
      ctx.register(sym, docNode);
      return docNode;
    }

    case 'DocsAst': {
      const n = node as DocsAst;
      const sym = ctx.createSymbol();
      const docNode: LayerHir = {
        kind: 'LayerHir',
        symbolId: sym,
        syntaxLayer: 1,
        title: n.title,
        description: n.description ?? null,
        annotations: {}
      };
      ctx.register(sym, docNode);
      return docNode;
    }

    default:
      console.warn(`[Transformer] Unhandled Ast kind: ${(node as any).kind}`);
      return {
        kind: 'LiteralHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: 1,
        value: null
      } as LiteralHir;
  }
}

/**
 * Трансформация модификаторов в унифицированные атрибуты HIR
 */
export function modifiersAstToHir(ctx: HirCtx, modifiers?: IModifierAst[]): ModifierHir[] {
  if (!modifiers) return [];

  return modifiers.map(m => {
    let type: ModifierHir['type'] = 'public';

    if (m.kind === 'ExportModifierAst') type = 'export';
    else if (m.kind === 'OverrideModifierAst') type = 'override';
    else if (m.kind === 'FunctionModifierAst') type = (m as any).operator;
    else if (m.kind === 'ParameterModifierAst') type = (m as any).operator;
    else if (m.kind === 'InstanceModifierAst') type = (m as any).operator === 'const' ? 'const' : 'mut';

    return {
      kind: 'ModifierHir',
      symbolId: ctx.createSymbol(),
      syntaxLayer: 3,
      type
    };
  });
}
