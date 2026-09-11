import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

/**
 * Главный класс трансформации AST в унифицированный HIR
 */
export class HirCtx {
  private readonly docs = new Map<abstracts.translators.SymbolId, abstracts.translators.LayerHir>();
  private nextId: abstracts.translators.SymbolId = 1;
  private scopes: Map<string, abstracts.translators.SymbolId>[] = [new Map()];

  public register(symbolId: abstracts.translators.SymbolId, doc: abstracts.translators.LayerHir): void {
    this.docs.set(symbolId, doc);
  }

  public getDoc(symbolId: abstracts.translators.SymbolId): abstracts.meta.NullOptional<abstracts.translators.LayerHir> {
    return this.docs.get(symbolId) || null;
  }

  public createSymbol(): abstracts.translators.SymbolId {
    return this.nextId++;
  }

  public pushScope(): void {
    this.scopes.push(new Map());
  }

  public popScope(): void {
    this.scopes.pop();
  }

  public define(name: string): abstracts.translators.SymbolId {
    const id = this.nextId++;
    this.scopes[this.scopes.length - 1].set(name, id);
    return id;
  }

  public resolve(name: string): abstracts.translators.SymbolId {
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

export function astToHir(ctx: HirCtx, node: abstracts.meta.NullOptional<abstracts.translators.AstType>): abstracts.translators.HirType {
  if (!node || !node.kind) {
    return {
      kind: 'LiteralHir',
      symbolId: ctx.createSymbol(),
      syntaxLayer: 2,
      semanticLayer: 1,
      value: null
    } as abstracts.translators.LiteralHir;
  }

  const baseLayer: abstracts.translators.SyntaxLayer = node.syntaxLayer ?? 2;

  switch (node.kind) {
    // ==========================================
    // 0. PANIC
    // ==========================================
    case 'TryAst': {
      const n = node as abstracts.translators.TryAst;
      return {
        kind: 'TryCatchHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        tryBlock: astToHir(ctx, n.block) as abstracts.translators.BlockHir,
        catches: [],
        finallyBlock: null
      };
    }

    case 'ThrowAst': {
      const n = node as abstracts.translators.ThrowAst;
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
      const n = node as abstracts.translators.LiteralAst;
      return {
        kind: 'LiteralHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        value: n.value
      } as abstracts.translators.LiteralHir;
    }

    case 'TemplateAst': {
      const n = node as abstracts.translators.TemplateAst;
      return {
        kind: 'TemplateHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        values: n.values.map(v => astToHir(ctx, v))
      } as abstracts.translators.TemplateHir;
    }

    // Массивы и Кортежи унифицированы в SequenceHir
    case 'ArrayAst':
    case 'TupleAst': {
      const n = node as abstracts.translators.ArrayAst | abstracts.translators.TupleAst;
      return {
        kind: 'SequenceHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        semanticLayer: n.semanticLayer ?? 1,
        elements: n.values.map(v => astToHir(ctx, v))
      } as abstracts.translators.SequenceHir;
    }

    // Объекты и Mapped-типы унифицированы в ObjectHir
    case 'ObjectAst': {
      const n = node as abstracts.translators.ObjectAst;
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
          } as abstracts.translators.LiteralHir,
          value: astToHir(ctx, p.value)
        }))
      } as abstracts.translators.ObjectHir;
    }

    // ==========================================
    // 2. OPERATIONS
    // ==========================================
    case 'UnaryAst': {
      const n = node as abstracts.translators.UnaryAst;
      return {
        kind: 'UnaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator,
        operand: astToHir(ctx, n.value),
        isPrefix: n.isPrefix
      } as abstracts.translators.UnaryHir;
    }

    case 'SpreadAst': {
      const n = node as abstracts.translators.SpreadAst;
      return {
        kind: 'UnaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: 'spread',
        operand: astToHir(ctx, n.value),
        isPrefix: true
      } as abstracts.translators.UnaryHir;
    }

    case 'ShapingAst': {
      const n = node as abstracts.translators.ShapingAst;
      return {
        kind: 'CastHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator === 'typeof' ? 'typeof' : 'as',
        targetShape: astToHir(ctx, n.value),
        value: astToHir(ctx, n.value)
      } as abstracts.translators.CastHir;
    }

    case 'BinaryAst': {
      const n = node as abstracts.translators.BinaryAst;
      return {
        kind: 'BinaryHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        operator: n.operator,
        left: astToHir(ctx, n.left),
        right: astToHir(ctx, n.right)
      } as abstracts.translators.BinaryHir;
    }

    // ==========================================
    // 3. FLOW (IF / SWITCH / TERNARY -> MATCH)
    // ==========================================
    case 'IfAst':
    case 'TernaryAst': {
      const n = node as abstracts.translators.IfAst | abstracts.translators.TernaryAst;
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
          } as abstracts.translators.MatchArmHir;
        })
      } as abstracts.translators.MatchHir;
    }

    case 'SwitchAst': {
      const n = node as abstracts.translators.SwitchAst;
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
          } as abstracts.translators.MatchArmHir;
        })
      } as abstracts.translators.MatchHir;
    }

    // ==========================================
    // 3. FLOW (LOOPS -> LOOPHIR)
    // ==========================================
    case 'WhileDoAst': {
      const n = node as abstracts.translators.WhileDoAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: null,
        condition: astToHir(ctx, n.condition),
        update: null,
        block: astToHir(ctx, n.block) as abstracts.translators.BlockHir,
        isPostCondition: false
      } as abstracts.translators.LoopHir;
    }

    case 'DoWhileAst': {
      const n = node as abstracts.translators.DoWhileAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: null,
        condition: astToHir(ctx, n.condition),
        update: null,
        block: astToHir(ctx, n.block) as abstracts.translators.BlockHir,
        isPostCondition: true
      } as abstracts.translators.LoopHir;
    }

    case 'ForInAst': // ForIAst
    case 'ForItAst': {
      const n = node as abstracts.translators.ForIAst | abstracts.translators.ForItAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: n.init ? astToHir(ctx, n.init) : null,
        condition: n.condition ? astToHir(ctx, n.condition) : null,
        update: n.update ? astToHir(ctx, n.update) : null,
        block: astToHir(ctx, n.block) as abstracts.translators.BlockHir,
        isPostCondition: false
      } as abstracts.translators.LoopHir;
    }

    case 'ForOfAst': {
      const n = node as abstracts.translators.ForOfAst;
      return {
        kind: 'LoopHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        init: astToHir(ctx, n.init),
        condition: null,
        update: null,
        block: astToHir(ctx, n.block) as abstracts.translators.BlockHir,
        isPostCondition: false
      } as abstracts.translators.LoopHir;
    }

    // ==========================================
    // 3. FLOW (BLOCKS & JUMPS)
    // ==========================================
    case 'BlockAst': {
      const n = node as abstracts.translators.BlockAst;
      ctx.pushScope();
      const statements = n.statements.map(s => astToHir(ctx, s));
      ctx.popScope();
      return {
        kind: 'BlockHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        type: 'value',
        statements
      } as abstracts.translators.BlockHir;
    }

    case 'ReturnAst': {
      const n = node as abstracts.translators.ReturnAst;
      return {
        kind: 'ReturnHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        value: n.value ? astToHir(ctx, n.value) : null
      } as abstracts.translators.ReturnHir;
    }

    case 'BreakAst': {
      const n = node as abstracts.translators.BreakAst;
      return {
        kind: 'GoHir',
        type: 'break',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetLoopSymbol: n.identifier ? ctx.resolve(n.identifier.name) : null
      } as abstracts.translators.GoHir;
    }

    case 'ContinueAst': {
      const n = node as abstracts.translators.ContinueAst;
      return {
        kind: 'GoHir',
        type: 'continue',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetLoopSymbol: n.identifier ? ctx.resolve(n.identifier.name) : null
      } as abstracts.translators.GoHir;
    }

    case 'YieldAst': {
      const n = node as abstracts.translators.YieldAst;
      return {
        kind: 'YieldHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        value: n.value ? astToHir(ctx, n.value) : null,
        isDelegate: false
      } as abstracts.translators.YieldHir;
    }

    // ==========================================
    // 4. DECLARATIONS & FUNCTIONS
    // ==========================================
    case 'ParameterAst': {
      const n = node as abstracts.translators.ParameterAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: tsRl.modifiersAstToHir(ctx, n.modifiers),
        shape: n.shape ? astToHir(ctx, n.shape) : null,
        value: n.value ? astToHir(ctx, n.value) : null,
        externalSource: null
      } as abstracts.translators.BindingHir;
    }

    case 'FunctionAst':
    case 'LambdaAst': {
      const n = node as abstracts.translators.FunctionAst | abstracts.translators.LambdaAst;
      const fnName = (n as abstracts.translators.FunctionAst).identifier ? (n as abstracts.translators.FunctionAst).identifier.name : 'anonymous';
      const fnSymbol = ctx.define(fnName);

      ctx.pushScope();
      const parameters = n.parameters.map(p => astToHir(ctx, p) as abstracts.translators.BindingHir);
      const block = astToHir(ctx, n.block) as abstracts.translators.BlockHir;
      ctx.popScope();

      return {
        kind: 'FunctionHir',
        symbolId: fnSymbol,
        syntaxLayer: baseLayer,
        modifiers: tsRl.modifiersAstToHir(ctx, n.modifiers),
        parameters,
        returnShape: n.returnShape ? astToHir(ctx, n.returnShape) : null,
        block
      } as abstracts.translators.FunctionHir;
    }

    // Struct, Interface, Class унифицированы в ShapeDeclarationHir
    case 'StructAst':
    case 'InterfaceAst':
    case 'ClassAst': {
      const n = node as abstracts.translators.StructAst | abstracts.translators.InterfaceAst | abstracts.translators.ClassAst;
      const shapeSymbol = ctx.define(n.identifier.name);

      ctx.pushScope();
      const fields: Record<string, abstracts.translators.HirType> = {};
      n.properties.forEach(p => {
        fields[p.identifier.name] = astToHir(ctx, p.value);
      });

      const methods = ((n as abstracts.translators.ClassAst).methods || []).map(m => astToHir(ctx, m) as abstracts.translators.FunctionHir);
      ctx.popScope();

      return {
        kind: 'StructHir',
        symbolId: shapeSymbol,
        syntaxLayer: baseLayer,
        modifiers: tsRl.modifiersAstToHir(ctx, n.modifiers),
        extendsShapes: [],
        fields,
        methods
      } as abstracts.translators.StructHir;
    }

    case 'ModuleAst': {
      const n = node as abstracts.translators.ModuleAst;
      const modSymbol = ctx.define(n.identifier.name);
      return {
        kind: 'ModuleHir',
        symbolId: modSymbol,
        syntaxLayer: baseLayer,
        identifier: n.identifier.name,
        role: n.role,
        version: n.version,
        block: astToHir(ctx, n.block) as abstracts.translators.BlockHir
      } as abstracts.translators.ModuleHir;
    }

    // ==========================================
    // 5. BINDINGS
    // ==========================================
    case 'InstanceAst': {
      const n = node as abstracts.translators.InstanceAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: tsRl.modifiersAstToHir(ctx, n.modifiers),
        shape: n.shape ? astToHir(ctx, n.shape) : null,
        value: astToHir(ctx, n.value),
        externalSource: null
      } as abstracts.translators.BindingHir;
    }

    case 'AliasAst': {
      const n = node as abstracts.translators.AliasAst;
      const sym = ctx.define(n.identifier.name);
      return {
        kind: 'BindingHir',
        symbolId: sym,
        syntaxLayer: baseLayer,
        modifiers: tsRl.modifiersAstToHir(ctx, n.modifiers),
        shape: null,
        value: astToHir(ctx, n.value),
        externalSource: null
      } as abstracts.translators.BindingHir;
    }

    case 'ImportAst': {
      const n = node as abstracts.translators.ImportAst;
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
      } as abstracts.translators.BindingHir;
    }

    case 'AssignAst': {
      const n = node as abstracts.translators.AssignAst;
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
        } as abstracts.translators.ReferenceHir,
        value: astToHir(ctx, n.value)
      } as abstracts.translators.AssignHir;
    }

    // ==========================================
    // 6. ACCESS
    // ==========================================
    case 'ReferenceAst': {
      const n = node as abstracts.translators.ReferenceAst;
      return {
        kind: 'ReferenceHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        targetSymbol: ctx.resolve(n.identifier.name)
      } as abstracts.translators.ReferenceHir;
    }

    // Доступ по свойству и аргументу унифицирован в MemberHir
    case 'MemberAst':
    case 'ArgumentMemberAst': {
      const n = node as abstracts.translators.MemberAst | abstracts.translators.ArgumentMemberAst;
      const target = (n as abstracts.translators.MemberAst).object_ ?? (n as abstracts.translators.ArgumentMemberAst).argument;
      return {
        kind: 'MemberHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        target: astToHir(ctx, target),
        property: astToHir(ctx, n.property)
      } as abstracts.translators.MemberHir;
    }

    case 'CallAst':
    case 'MacroCallAst': {
      const n = node as abstracts.translators.CallAst;
      const callee = n.identifier
        ? {
          kind: 'ReferenceHir',
          symbolId: ctx.createSymbol(),
          syntaxLayer: 2,
          targetSymbol: ctx.resolve(n.identifier.name)
        } as abstracts.translators.ReferenceHir
        : {
          kind: 'LiteralHir',
          symbolId: ctx.createSymbol(),
          syntaxLayer: 2,
          semanticLayer: 1,
          value: null
        } as abstracts.translators.LiteralHir;

      return {
        kind: 'CallHir',
        symbolId: ctx.createSymbol(),
        syntaxLayer: baseLayer,
        callee,
        arguments_: (n.arguments_ || []).map(a => astToHir(ctx, a as abstracts.translators.AstType))
      } as abstracts.translators.CallHir;
    }

    // ==========================================
    // 7. LAYERS & DOCUMENTATION
    // ==========================================
    case 'FunctionDocsAst': {
      const n = node as abstracts.translators.FunctionDocsAst;
      const sym = ctx.createSymbol();
      const docNode: abstracts.translators.LayerHir = {
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
      const n = node as abstracts.translators.DocsAst;
      const sym = ctx.createSymbol();
      const docNode: abstracts.translators.LayerHir = {
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
      } as abstracts.translators.LiteralHir;
  }
}
