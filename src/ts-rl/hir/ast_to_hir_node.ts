import * as abstractions from '@razomy/abstractions';
import * as tsRl from "@razomy/ts-rl";

export function astToHirNode(
  ctx: tsRl.hir.SemanticContext,
  iter: abstractions.patterns.HasEnterLeave,
  node: abstractions.translator.AsnType,
): abstractions.translator.HirnType {
  function recurse(child: abstractions.translator.AsnType) {
    return astToHirNode(ctx, iter, child);
  }

  let hir: abstractions.translator.HirnType;

  switch (node.kind) {
    // region Modifiers (были потеряны — падали в default)
    case 'InstanceModifierAsn':
    case 'FunctionModifierAsn':
    case 'ParameterModifierAsn':
    case 'InheritModifierAsn':
    case 'DependencyModifierAsn': {
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.operator;
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }

    case 'AccessModifierAsn':{
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.operator;
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }
    case 'OverrideModifierAsn': {
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = 'override';
      lit.syntaxRole = 'modifier';
      lit.semanticLayer = 'meta';
      hir = lit;
      break;
    }
    // endregion Modifiers

    case 'LiteralAsn': {
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.value;
      hir = lit;
      break;
    }

    case 'TemplateAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = '+';
      op.operands = node.values.map(recurse);
      hir = op;
      break;
    }

    case 'SpreadAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = '...';
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'UnaryAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      // Сохраняем информацию о префиксной/постфиксной форме
      op.operator = node.isPrefix ? `${node.operator}_pre` : `${node.operator}_post`;
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'ShapingAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = node.operator;
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'DeleteAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = 'delete';
      op.operands = [recurse(node.value)];
      hir = op;
      break;
    }

    case 'BinaryAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = node.operator;
      op.operands = [recurse(node.left), recurse(node.right)];
      hir = op;
      break;
    }

    case 'AssignAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = '=';
      const ref = new tsRl.hir.ReferenceSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.identifier.name;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      ref.target = lit;
      ref.property = null;
      ref.arguments_ = [];
      ref.syntaxRole = 'expression';
      ref.semanticLayer = 'state';

      op.operands = [ref, recurse(node.value)];
      hir = op;
      break;
    }

    case 'MappedAsn': {
      const b = new tsRl.hir.BindingSn(ctx);
      b.name = null;
      b.modifiers = [];
      b.shape = recurse(node.constraint) as abstractions.translator.ReferenceHirn;
      b.value = recurse(node.value);
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'PropertyAsn': {
      const b = new tsRl.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = [];
      b.shape = node.shape ? (recurse(node.shape) as abstractions.translator.ReferenceHirn) : null;
      b.value = node.value ? recurse(node.value) : null;
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'BlockAsn':
    case 'StyleBlockAsn': {
      const b = new tsRl.hir.BlockSn(ctx);
      b.statements = node.statements.map(recurse);
      hir = b;
      break;
    }

    case 'IfAsn':
    case 'TernaryAsn': {
      const m = new tsRl.hir.MatchSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      m.target = lit;
      m.branches = node.branches.map((b) => recurse(b) as abstractions.translator.BranchHirn);
      hir = m;
      break;
    }

    case 'SwitchAsn': {
      const m = new tsRl.hir.MatchSn(ctx);
      m.target = recurse(node.target);
      m.branches = node.branches.map((b) => recurse(b) as abstractions.translator.BranchHirn);
      hir = m;
      break;
    }

    case 'ConditionBranchAsn':
    case 'MatchBranchAsn': {
      const br = new tsRl.hir.BranchSn(ctx);
      br.pattern = recurse(node.pattern);
      br.value = recurse(node.value);
      hir = br;
      break;
    }

    case 'CatchAsn': {
      const br = new tsRl.hir.BranchSn(ctx);
      br.pattern = recurse(node.condition);
      br.value = recurse(node.block);
      hir = br;
      break;
    }

    case 'ElseBranchAsn':
    case 'DefaultBranchAsn': {
      const br = new tsRl.hir.BranchSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      br.pattern = lit;
      br.value = recurse(node.value);
      hir = br;
      break;
    }

    case 'TryAsn': {
      const m = new tsRl.hir.MatchSn(ctx);
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = 'try';
      op.syntaxRole = 'statement';
      op.semanticLayer = 'state';
      op.operands = [recurse(node.block)];
      m.target = op;
      m.branches = 'branches' in node && Array.isArray((node as any).branches)
        ? (node as any).branches.map((b: any) => recurse(b) as abstractions.translator.BranchHirn)
        : [];
      hir = m;
      break;
    }

    case 'DefaultCatchAsn':
    case 'FinallyAsn': {
      const br = new tsRl.hir.BranchSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.kind === 'FinallyAsn' ? 'finally' : true;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      br.pattern = lit;
      br.value = recurse(node.block);
      hir = br;
      break;
    }

    case 'WhileDoAsn': {
      const loop = new tsRl.hir.LoopSn(ctx);
      loop.condition = recurse(node.condition);
      loop.block = recurse(node.block) as abstractions.translator.BlockHirn;
      hir = loop;
      break;
    }

    case 'DoWhileAsn': {
      // Сохраняем семантику do-while через модификатор/обертку
      const loop = new tsRl.hir.LoopSn(ctx);
      loop.condition = recurse(node.condition);
      loop.block = recurse(node.block) as abstractions.translator.BlockHirn;
      const doMod = new tsRl.hir.LiteralSn(ctx);
      doMod.value = 'do_while';
      doMod.syntaxRole = 'modifier';
      doMod.semanticLayer = 'meta';
      (loop as any).modifiers = [doMod];
      hir = loop;
      break;
    }

    case 'ForInAsn':
    case 'ForItAsn': {
      const loop = new tsRl.hir.LoopSn(ctx);
      const rootBlock = node.init ? new tsRl.hir.BlockSn(ctx) : null;

      let bodyHirn = recurse(node.block) as abstractions.translator.BlockHirn;
      if (node.update) {
        const updateHirn = recurse(node.update);
        if (bodyHirn.kind === 'BlockHirn') {
          bodyHirn.statements.push(updateHirn);
        } else {
          const wrapper = new tsRl.hir.BlockSn(ctx);
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
      const blk = new tsRl.hir.BlockSn(ctx);
      const loop = new tsRl.hir.LoopSn(ctx);
      loop.condition = null;
      loop.syntaxRole = node.syntaxRole;
      loop.semanticLayer = 'state';
      loop.block = recurse(node.block) as abstractions.translator.BlockHirn;

      blk.statements = [recurse(node.init), loop];
      hir = blk;
      break;
    }

    case 'BreakAsn':
    case 'ContinueAsn': {
      const go = new tsRl.hir.GoSn(ctx);
      go.operator = node.kind === 'BreakAsn' ? 'break' : 'continue';
      if (node.identifier) {
        const ref = new tsRl.hir.ReferenceSn(ctx);
        const lit = new tsRl.hir.LiteralSn(ctx);
        lit.value = node.identifier.name;
        lit.syntaxRole = 'expression';
        lit.semanticLayer = 'state';
        ref.target = lit;
        ref.property = null;
        ref.arguments_ = [];
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
      const go = new tsRl.hir.GoSn(ctx);
      go.operator = node.kind.replace('Asn', '').toLowerCase() as any;
      go.value = node.value ? recurse(node.value) : null;
      hir = go;
      break;
    }

    case 'InstanceAsn':
    case 'ParameterAsn': {
      const b = new tsRl.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = node.modifiers ? node.modifiers.map(recurse) : [];
      b.shape = node.shape ? (recurse(node.shape) as abstractions.translator.ReferenceHirn) : null;
      b.value = node.value ? recurse(node.value) : null;
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'LambdaAsn':
    case 'FunctionAsn': {
      const fn = new tsRl.hir.FunctionSn(ctx);
      fn.name = node.kind === 'FunctionAsn' && node.identifier ? node.identifier.name : null;
      fn.modifiers = node.modifiers ? node.modifiers.map(recurse) : [];
      fn.returnShape = node.returnShape ? (recurse(node.returnShape) as abstractions.translator.ReferenceHirn) : null;
      fn.parameters = (node.parameters || []).map((p) => recurse(p) as abstractions.translator.BindingHirn);
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
      const s = new tsRl.hir.ModuleSn(ctx);
      s.name = node.identifier.name;

      const modLit = new tsRl.hir.LiteralSn(ctx);
      modLit.value = 'module';
      modLit.syntaxRole = 'modifier';
      modLit.semanticLayer = 'meta';

      const roleLit = new tsRl.hir.LiteralSn(ctx);
      roleLit.value = node.role;
      roleLit.syntaxRole = 'modifier';
      roleLit.semanticLayer = 'meta';

      s.modifiers = [modLit, roleLit];

      // Сохраняем версию модуля, если присутствует
      if (node.version) {
        const verLit = new tsRl.hir.LiteralSn(ctx);
        verLit.value = `version:${node.version}`;
        verLit.syntaxRole = 'modifier';
        verLit.semanticLayer = 'meta';
        s.modifiers.push(verLit);
      }

      s.properties = node.block?.statements ? [...node.block.statements].map(recurse) : [];
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'ArrayAsn':
    case 'TupleAsn': {
      const s = new tsRl.hir.StructSn(ctx);
      s.name = null;
      s.modifiers = [];
      s.properties = node.values.map(recurse);
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'ObjectAsn':
    case 'StructAsn':
    case 'InterfaceAsn':
    case 'ClassAsn':
    case 'EnumAsn': {
      const s = new tsRl.hir.StructSn(ctx);
      s.name = 'identifier' in node && node.identifier ? node.identifier.name : null;

      const kindModifier = new tsRl.hir.LiteralSn(ctx);
      kindModifier.value = node.kind.replace('Asn', '').toLowerCase();
      kindModifier.syntaxRole = 'modifier';
      kindModifier.semanticLayer = 'shape';

      const baseModifiers =
        'modifiers' in node && node.modifiers
          ? (node.modifiers as abstractions.translator.AsnType[]).map(recurse)
          : [];

      // Переносим параметры типов/дженерики (parameters), которые раньше терялись
      const genericModifiers =
        'parameters' in node && node.parameters
          ? (node.parameters as abstractions.translator.AsnType[]).map(recurse)
          : [];

      s.modifiers = [kindModifier, ...baseModifiers, ...genericModifiers];
      s.properties = node.properties.map(recurse);
      s.doc = { description: '' };
      hir = s;
      break;
    }

    case 'ReferenceAsn':
    case 'AliasAsn': {
      const ref = new tsRl.hir.ReferenceSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.identifier.name;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'state';
      ref.target = lit;
      ref.property = null;
      ref.arguments_ = [];
      hir = ref;
      break;
    }

    case 'MacroCallAsn': {
      const ref = new tsRl.hir.ReferenceSn(ctx);
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.identifier.name;
      lit.syntaxRole = 'expression';
      lit.semanticLayer = 'meta';
      ref.target = lit;
      ref.property = null;
      // Переносим аргументы/токены макроса
      ref.arguments_ = (node.arguments_ || []).map((token) => {
        const tokenLit = new tsRl.hir.LiteralSn(ctx);
        tokenLit.value = (token as any).value ?? token;
        tokenLit.syntaxRole = 'expression';
        tokenLit.semanticLayer = 'meta';
        return tokenLit;
      });
      hir = ref;
      break;
    }

    case 'MemberAsn': {
      const ref = new tsRl.hir.ReferenceSn(ctx);
      ref.target = recurse(node.object_);
      ref.property = recurse(node.property);
      ref.arguments_ = [];
      hir = ref;
      break;
    }

    case 'ArgumentMemberAsn': {
      const ref = new tsRl.hir.ReferenceSn(ctx);
      ref.target = recurse(node.argument);
      ref.property = recurse(node.property);
      ref.arguments_ = [];
      hir = ref;
      break;
    }

    case 'CallAsn':
    case 'DecoratorAsn': {
      const ref = new tsRl.hir.ReferenceSn(ctx);
      if (node.identifier) {
        const lit = new tsRl.hir.LiteralSn(ctx);
        lit.value = node.identifier.name;
        lit.syntaxRole = 'expression';
        lit.semanticLayer = node.kind === 'DecoratorAsn' ? 'meta' : 'state';
        ref.target = lit;
      } else {
        ref.target = null;
      }
      ref.property = null;
      ref.arguments_ = (node.arguments_ || []).map(recurse);
      hir = ref;
      break;
    }

    case 'ImportAsn': {
      const b = new tsRl.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      // Сохраняем модификаторы импорта
      b.modifiers = node.modifiers ? node.modifiers.map(recurse) : [];
      b.shape = null;
      b.doc = { description: '' };

      const importRef = new tsRl.hir.ReferenceSn(ctx);
      const targetLit = new tsRl.hir.LiteralSn(ctx);
      targetLit.value = 'import';
      targetLit.syntaxRole = node.syntaxRole;
      targetLit.semanticLayer = 'meta';
      importRef.target = targetLit;

      const pathLit = new tsRl.hir.LiteralSn(ctx);
      pathLit.value = node.path;
      pathLit.syntaxRole = 'expression';
      pathLit.semanticLayer = 'meta';

      importRef.arguments_ = [pathLit];

      // Сохраняем версию импорта в аргументы вызова import(...)
      if (node.version) {
        const verLit = new tsRl.hir.LiteralSn(ctx);
        verLit.value = node.version;
        verLit.syntaxRole = 'expression';
        verLit.semanticLayer = 'meta';
        importRef.arguments_.push(verLit);
      }

      importRef.property = null;
      importRef.syntaxRole = 'expression';
      importRef.semanticLayer = 'meta';

      b.value = importRef;
      hir = b;
      break;
    }

    case 'TagAsn': {
      const b = new tsRl.hir.BindingSn(ctx);
      b.name = node.identifier.name;
      b.modifiers = [];
      b.shape = null;
      b.value = recurse(node.value);
      b.doc = { description: '' };
      hir = b;
      break;
    }

    case 'TextAsn': {
      const lit = new tsRl.hir.LiteralSn(ctx);
      lit.value = node.value;
      hir = lit;
      break;
    }

    case 'DocsAsn': {
      const blk = new tsRl.hir.BlockSn(ctx);
      blk.statements = node.block.map(recurse);
      hir = blk;
      break;
    }

    case 'CommentAsn': {
      const blk = new tsRl.hir.BlockSn(ctx);
      blk.statements = [recurse(node.value)];
      hir = blk;
      break;
    }

    case 'QueryAsn':
    case 'ConstraintAsn': {
      const op = new tsRl.hir.OperatorSn(ctx);
      op.operator = node.kind === 'QueryAsn' ? 'query' : 'constraint';
      op.operands = [recurse(node.pattern)];
      hir = op;
      break;
    }

    default: {
      const lit = new tsRl.hir.LiteralSn(ctx);
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
