import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export function astToHirNode(
  ctx: tsHir.hir.SemanticContext,
  iter: abstractions.patterns.HasEnterLeave,
  node: abstractions.translator.AsnType,
): abstractions.hir.HirnType {
  function recurse(child: abstractions.translator.AsnType) {
    return astToHirNode(ctx, iter, child);
  }

  let hir: abstractions.hir.HirnType;

  switch (node.kind) {
    // region Modifiers (были потеряны — падали в default)
    case 'InstanceModifierAsn':
    case 'FunctionModifierAsn':
    case 'ParameterModifierAsn':
    case 'InheritModifierAsn':
    case 'DependencyModifierAsn': {
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = node.operator;
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }

    case 'AccessModifierAsn':{
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = node.operator;
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }
    case 'OverrideModifierAsn': {
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = 'override';
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }
    // endregion Modifiers

    case 'LiteralAsn': {
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = node.value;
      hir = lit;
      break;
    }

    case 'TemplateAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = '+';
      op.operands = node.values.map(recurse);
      hir = op;
      break;
    }

    case 'SpreadAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = '...';
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'UnaryAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      // Сохраняем информацию о префиксной/постфиксной форме
      op.operator = node.isPrefix ? `${node.operator}_pre` : `${node.operator}_post`;
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'ShapingAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = node.operator;
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'DeleteAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = 'delete';
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'BinaryAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = node.operator;
      op.operands = [recurse(node.left), recurse(node.right)];
      hir = op;
      break;
    }

    case 'RangeOperationAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = node.operator;
      op.operands = node.values.map(recurse);
      hir = op;
      break;
    }

    case 'AssignAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = '=';

      // Левый операнд — это ссылка на переменную (VarRef)
      const ref = new tsHir.hir.VarRefSn(ctx);
      ref.name = node.identifier.name;
      ref.resolvedDeclaration = null;
      ref.syntaxRole = 'expression';
      ref.semanticLayer = 'state';

      op.operands = [ref, recurse(node.value)];
      hir = op;
      break;
    }

    case 'MappedAsn': {
      const b = new tsHir.hir.BindingSn(ctx);
      b.name = null;
      b.modifiers = {
        isPublic: null,
        isConst: null
      };
      b.shape = recurse(node.constraint) as abstractions.hir.ReferenceHirnType;
      b.value = recurse(node.value);
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'PropertyAsn': {
      const b = new tsHir.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = {
        isPublic: null,
        isConst: null
      };
      b.shape = node.shape ? (recurse(node.shape) as abstractions.hir.ReferenceHirnType) : null;
      b.value = node.value ? recurse(node.value) : null;
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'BlockAsn':
    case 'StyleBlockAsn': {
      const b = new tsHir.hir.BlockSn(ctx);
      b.statements = node.statements.map(recurse);
      hir = b;
      break;
    }

    case 'IfAsn':
    case 'TernaryAsn': {
      const m = new tsHir.hir.MatchSn(ctx);
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      m.target = lit;
      m.branches = node.branches.map((b) => recurse(b) as abstractions.hir.BranchHirn);
      hir = m;
      break;
    }

    case 'SwitchAsn': {
      const m = new tsHir.hir.MatchSn(ctx);
      m.target = recurse(node.target);
      m.branches = node.branches.map((b) => recurse(b) as abstractions.hir.BranchHirn);
      hir = m;
      break;
    }

    case 'ConditionBranchAsn':
    case 'MatchBranchAsn': {
      const br = new tsHir.hir.BranchSn(ctx);
      br.pattern = recurse(node.pattern);
      br.value = recurse(node.value);
      hir = br;
      break;
    }

    case 'CatchAsn': {
      const br = new tsHir.hir.BranchSn(ctx);
      br.pattern = recurse(node.condition);
      br.value = recurse(node.block);
      hir = br;
      break;
    }

    case 'ElseBranchAsn':
    case 'DefaultBranchAsn': {
      const br = new tsHir.hir.BranchSn(ctx);
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      br.pattern = lit;
      br.value = recurse(node.value);
      hir = br;
      break;
    }

    case 'TryAsn': {
      const m = new tsHir.hir.MatchSn(ctx);
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = 'try';
      op.syntaxRole = 'statement';
      op.semanticLayer = 'state';
      op.operands = [recurse(node.block)];
      m.target = op;
      m.branches = 'branches' in node && Array.isArray((node as any).branches)
        ? (node as any).branches.map((b: any) => recurse(b) as abstractions.hir.BranchHirn)
        : [];
      hir = m;
      break;
    }

    case 'DefaultCatchAsn':
    case 'FinallyAsn': {
      const br = new tsHir.hir.BranchSn(ctx);
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = node.kind === 'FinallyAsn' ? 'finally' : true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      br.pattern = lit;
      br.value = recurse(node.block);
      hir = br;
      break;
    }

    case 'WhileDoAsn': {
      const loop = new tsHir.hir.LoopSn(ctx);
      loop.condition = recurse(node.condition);
      loop.block = recurse(node.block) as abstractions.hir.BlockHirn;
      hir = loop;
      break;
    }

    case 'DoWhileAsn': {
      // Сохраняем семантику do-while через модификатор/обертку
      const loop = new tsHir.hir.LoopSn(ctx);
      loop.condition = recurse(node.condition);
      loop.block = recurse(node.block) as abstractions.hir.BlockHirn;
      const doMod = new tsHir.hir.LiteralSn(ctx);
      doMod.value = 'do_while';
      doMod.syntaxRole = 'modifier';
      doMod.semanticLayer = 'meta';
      (loop as any).modifiers = [doMod];
      hir = loop;
      break;
    }

    case 'ForInAsn':
    case 'ForItAsn': {
      const loop = new tsHir.hir.LoopSn(ctx);
      const rootBlock = node.init ? new tsHir.hir.BlockSn(ctx) : null;

      let bodyHirn = recurse(node.block) as abstractions.hir.BlockHirn;
      if (node.update) {
        const updateHirn = recurse(node.update);
        if (bodyHirn.kind === 'BlockHirn') {
          bodyHirn.statements.push(updateHirn);
        } else {
          const wrapper = new tsHir.hir.BlockSn(ctx);
          wrapper.syntaxRole = 'statement';
          wrapper.semanticLayer = 'state';
          wrapper.statements = [bodyHirn, updateHirn];
          bodyHirn = wrapper;
        }
      }

      loop.condition = node.condition ? recurse(node.condition) : null;
      loop.block = bodyHirn;
      loop.syntaxRole = node.syntaxRole;
      loop.semanticLayer = 'state';

      if (rootBlock) {
        rootBlock.syntaxRole = node.syntaxRole;
        rootBlock.semanticLayer = 'state';
        rootBlock.statements = [recurse(node.init!), loop];
        hir = rootBlock;
      } else {
        hir = loop;
      }
      break;
    }

    case 'ForOfAsn': {
      const blk = new tsHir.hir.BlockSn(ctx);
      const loop = new tsHir.hir.LoopSn(ctx);
      loop.condition = null;
      loop.syntaxRole = node.syntaxRole;
      loop.semanticLayer = 'state';
      loop.block = recurse(node.block) as abstractions.hir.BlockHirn;

      blk.statements = [recurse(node.init), loop];
      hir = blk;
      break;
    }

    case 'BreakAsn':
    case 'ContinueAsn': {
      const go = new tsHir.hir.GoSn(ctx);
      go.operator = node.kind === 'BreakAsn' ? 'break' : 'continue';
      if (node.identifier) {
        // Метка перехода (label) — это ссылка на имя
        const ref = new tsHir.hir.VarRefSn(ctx);
        ref.name = node.identifier.name;
        ref.resolvedDeclaration = null;
        ref.syntaxRole = 'expression';
        ref.semanticLayer = 'state';
        go.value = ref;
      } else {
        go.value = null;
      }
      hir = go;
      break;
    }

    case 'YieldAsn':
    case 'ReturnAsn':
    case 'ThrowAsn': {
      const go = new tsHir.hir.GoSn(ctx);
      go.operator = node.kind.replace('Asn', '').toLowerCase() as any;
      go.value = node.value ? recurse(node.value) : null;
      hir = go;
      break;
    }

    case 'InstanceAsn':
    case 'ParameterAsn': {
      const b = new tsHir.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = {
        isPublic: node.modifiers.has(i=>i.kind === 'AccessModifierAsn' && i.operator === 'public'),
        isConst: node.modifiers.has(i=>i.kind === 'InstanceModifierAsn' && i.operator === 'const'),
      };
      b.shape = node.shape ? (recurse(node.shape) as abstractions.hir.ReferenceHirnType) : null;
      b.value = node.value ? recurse(node.value) : null;
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'LambdaAsn':
    case 'FunctionAsn': {
      const fn = new tsHir.hir.FunctionSn(ctx);
      fn.name = node.kind === 'FunctionAsn' && node.identifier ? node.identifier.name : null;
      fn.modifiers = {
        isPublic: node.modifiers.has(i=>i.kind === 'AccessModifierAsn' && i.operator === 'public'),
        isAsync: node.modifiers.has(i=>i.kind === 'FunctionModifierAsn' && i.operator === 'async'),
        isGenerator: node.modifiers.has(i=>i.kind === 'FunctionModifierAsn' && i.operator === 'generator'),
      };
      fn.returnShape = node.returnShape ? (recurse(node.returnShape) as abstractions.hir.ReferenceHirnType) : null;
      fn.parameters = (node.parameters || []).map((p) => recurse(p) as abstractions.hir.BindingHirn);
      fn.block = node.block ? recurse(node.block) : null;
      fn.doc = {
        title: null,
        description: null,
        returnDescription: null,
        examples: [],
      };
      hir = fn;
      break;
    }

    case 'ModuleAsn': {
      const s = new tsHir.hir.ModuleSn(ctx);
      s.name = node.identifier.name;

      const roleLit = new tsHir.hir.LiteralSn(ctx);
      roleLit.value = node.role;
      roleLit.syntaxRole = 'modifier';
      roleLit.semanticLayer = 'meta';

      s.modifiers = {
        isPublic: true,
        isSourceFile: node.role === 'SourceFile',
        version: null
      };

      if (node.version) {
        s.modifiers.version = node.version;
      }

      s.statements = node.block?.statements ? [...node.block.statements].map(recurse) as any[] : [];
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'ArrayAsn':
    case 'TupleAsn': {
      const s = new tsHir.hir.StructSn(ctx);
      s.name = null;
      s.modifiers = {
        isPublic: null,
        isEnum: false,
      };
      s.properties = node.values.map(recurse) as any[];
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'ObjectAsn':
    case 'StructAsn':
    case 'InterfaceAsn':
    case 'ClassAsn':{
      const s = new tsHir.hir.StructSn(ctx);
      s.name = 'identifier' in node && node.identifier ? node.identifier.name : null;
      s.modifiers = {
        isPublic: node.modifiers.has(i=>i.kind === 'AccessModifierAsn' && i.operator === 'public'),
        isEnum: false,
      };
      s.properties = node.properties.map(recurse) as any[];
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'EnumAsn': {
      const s = new tsHir.hir.StructSn(ctx);
      s.name = 'identifier' in node && node.identifier ? node.identifier.name : null;
      s.modifiers = {
        isPublic: node.modifiers.has(i=>i.kind === 'AccessModifierAsn' && i.operator === 'public'),
        isEnum: true,
      };
      s.properties = node.properties.map(recurse) as any;
      s.properties.map(i=>(i as abstractions.hir.BindingHirn).modifiers.isConst = true);
      s.doc = { description: '' };
      hir = s;
      break;
    }

    // =========================================================================
    // 1. ЧТЕНИЕ ПЕРЕМЕННЫХ И ПСЕВДОНИМОВ (VarRef)
    // =========================================================================
    case 'ReferenceAsn':
    case 'AliasAsn': {
      const ref = new tsHir.hir.VarRefSn(ctx);
      ref.name = node.identifier.name;
      ref.resolvedDeclaration = null;
      hir = ref;
      break;
    }

    // =========================================================================
    // 2. ДОСТУП К СВОЙСТВАМ И ПОЛЯМ (MemberAccess)
    // =========================================================================
    case 'MemberAsn': {
      const member = new tsHir.hir.MemberAccessSn(ctx);
      member.target = recurse(node.object_) as any;
      member.property = recurse(node.property);
      hir = member;
      break;
    }

    case 'ArgumentMemberAsn': {
      const member = new tsHir.hir.MemberAccessSn(ctx);
      member.target = recurse(node.argument) as any;
      member.property = recurse(node.property);
      hir = member;
      break;
    }

    // =========================================================================
    // 3. ВЫЗОВЫ: ФУНКЦИИ, ДЕКОРАТОРЫ, МАКРОСЫ (Call)
    // =========================================================================
    case 'CallAsn':
    case 'DecoratorAsn': {
      const call = new tsHir.hir.CallSn(ctx);

      if (node.kind === 'DecoratorAsn') {
        call.semanticLayer = 'meta';
      }

      // Callee — это ссылка на вызываемый символ или выражение
      if (node.identifier) {
        const calleeRef = new tsHir.hir.VarRefSn(ctx);
        calleeRef.name = node.identifier.name;
        calleeRef.resolvedDeclaration = null;
        if (node.kind === 'DecoratorAsn') {
          calleeRef.semanticLayer = 'meta';
        }
        call.callee = calleeRef;
      } else if ((node as any).callee) {
        call.callee = recurse((node as any).callee) as any;
      } else {
        call.callee = null as any;
      }

      call.arguments_ = (node.arguments_ || []).map(recurse);
      hir = call;
      break;
    }

    case 'MacroCallAsn': {
      const call = new tsHir.hir.CallSn(ctx);
      call.syntaxRole = 'expression';
      call.semanticLayer = 'meta';

      const calleeRef = new tsHir.hir.VarRefSn(ctx);
      calleeRef.name = node.identifier.name;
      calleeRef.syntaxRole = 'expression';
      calleeRef.semanticLayer = 'meta';
      calleeRef.resolvedDeclaration = null;
      call.callee = calleeRef;

      call.arguments_ = (node.arguments_ || []).map((token) => {
        const tokenLit = new tsHir.hir.LiteralSn(ctx);
        tokenLit.value = (token as any).value ?? token;
        tokenLit.syntaxRole = 'expression';
        tokenLit.semanticLayer = 'meta';
        return tokenLit;
      });

      hir = call;
      break;
    }

    case 'ImportAsn': {
      const b = new tsHir.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = {
        isPublic: node.modifiers.has(i=>i.kind === 'AccessModifierAsn' && i.operator === 'public'),
        isConst: node.modifiers.has(i=>i.kind === 'InstanceModifierAsn' && i.operator === 'const'),
      };
      b.shape = null;
      b.doc = { description: '' };

      // Импорт представлен как вызов системной функции import(path, [version])
      const importCall = new tsHir.hir.CallSn(ctx);
      importCall.syntaxRole = 'expression';
      importCall.semanticLayer = 'meta';

      const calleeRef = new tsHir.hir.VarRefSn(ctx);
      calleeRef.name = 'import';
      calleeRef.syntaxRole = 'expression';
      calleeRef.semanticLayer = 'meta';
      calleeRef.resolvedDeclaration = null;
      importCall.callee = calleeRef;

      const pathLit = new tsHir.hir.LiteralSn(ctx);
      pathLit.value = node.path;
      pathLit.syntaxRole = 'expression';
      pathLit.semanticLayer = 'meta';

      importCall.arguments_ = [pathLit];

      if (node.version) {
        const verLit = new tsHir.hir.LiteralSn(ctx);
        verLit.value = node.version;
        verLit.syntaxRole = 'expression';
        verLit.semanticLayer = 'meta';
        importCall.arguments_.push(verLit);
      }

      b.value = importCall;
      hir = b;
      break;
    }

    case 'TagAsn': {
      const b = new tsHir.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = {
        isPublic: null,
        isConst: null
      };
      b.shape = null;
      b.value = recurse(node.value);
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'TextAsn': {
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = node.value;
      hir = lit;
      break;
    }

    case 'DocsAsn': {
      const blk = new tsHir.hir.BlockSn(ctx);
      blk.statements = node.block.map(recurse);
      hir = blk;
      break;
    }

    case 'CommentAsn': {
      const blk = new tsHir.hir.BlockSn(ctx);
      blk.statements = [recurse(node.value)];
      hir = blk;
      break;
    }

    case 'QueryAsn':
    case 'ConstraintAsn': {
      const op = new tsHir.hir.OperatorSn(ctx);
      op.operator = node.kind === 'QueryAsn' ? 'query' : 'constraint';
      op.operands = [recurse(node.pattern)];
      hir = op;
      break;
    }

    default: {
      const lit = new tsHir.hir.LiteralSn(ctx);
      lit.value = null;
      hir = lit;
      break;
    }
  }

  // Перенос системных метаданных
  if ('syntaxRole' in node && node.syntaxRole) {
    hir.syntaxRole = node.syntaxRole;
  } else if (!hir.syntaxRole) {
    hir.syntaxRole = 'expression';
  }

  if ('semanticLayer' in node && (node as any).semanticLayer) {
    hir.semanticLayer = (node as any).semanticLayer;
  } else if (!hir.semanticLayer) {
    hir.semanticLayer = 'state';
  }

  if (!iter.enter(hir, node)) return hir;
  return iter.leave(hir, node);
}
