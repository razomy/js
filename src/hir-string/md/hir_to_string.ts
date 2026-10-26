import * as abstractions from '@razomy/abstractions';
import * as hirString from "@razomy/hir-string";

function modifiersToLiterals(
  struct:
    abstractions.hir.FunctionHirn | abstractions.hir.BindingHirn | abstractions.hir.StructHirn,
) {
  const p = struct.modifiers.isPublic ? 'public': '';
  return [p].filter(Boolean).join(' ');
}

export function hirToString(node: abstractions.meta.NullOptional<abstractions.hir.HirnType>): string {
  if (!node) {
    throw new Error('Unknown Type');
  }

  switch (node.kind) {
    case 'LiteralHirn': {
      if (typeof node.value === 'string') {
        return `"${node.value}"`;
      }
      return String(node.value);
    }

    case 'OperatorHirn': {
      if (node.operands.length === 1) {
        return `${node.operator}${hirToString(node.operands[0])}`;
      }
      if (node.operands.length === 2) {
        return `${hirToString(node.operands[0])} ${node.operator} ${hirToString(node.operands[1])}`;
      }
      return `${node.operator}`;
    }

    case 'BindingHirn': {
      const prefix = node.name;
      const postfix = node.value ? hirToString(node.value) : '';
      const modifiers = modifiersToLiterals(node);
      const isConst = modifiers.includes('const');
      const keyword = modifiers ? `${modifiers} ` : isConst ? 'const ' : 'let ';
      const shape = node.shape ? `: ${hirToString(node.shape)}` : '';

      if (prefix && postfix) {
        return `${keyword}${prefix}${shape} = ${postfix}`.trim();
      } else if (prefix) {
        return `${keyword}${prefix}${shape}`.trim();
      } else if (postfix) {
        return `${keyword}${postfix}${shape}`.trim();
      }
      return '';
    }

    case 'StructHirn': {
      const struct = node as abstractions.hir.StructHirn;
      const fieldEntries = Object.entries(struct.properties || {}).map(
        ([fieldName, fieldShape]) => `${fieldName}: ${hirToString(fieldShape)}`,
      );
      const modifiers = modifiersToLiterals(struct);
      const keyword = modifiers ? `${modifiers} ` : '';
      const extendsClause = '';
      return `\n${keyword}${struct.name ?? ''}${extendsClause} \n{ ${fieldEntries.join(', ')} }\n`;
    }

    case 'FunctionHirn': {
      const modifiers = modifiersToLiterals(node);
      const isAsync = modifiers.includes('async') ? 'async ' : '';

      const generics = node.parameters.filter((i) => i.semanticLayer == 'generic');
      const shapesStr = generics.length ? `<${generics.map((g: any) => g.name || hirToString(g)).join(', ')}>` : '';

      const paramsStr = node.parameters
        .filter((i) => i.semanticLayer == 'state')
        .map((p) => {
          const typeStr = p.shape ? `: ${hirToString(p.shape)}` : '';
          return `${p.name || 'arg'}${typeStr}`;
        })
        .join(', ');

      const returnStr = node.returnShape ? ': ' + hirToString(node.returnShape) : '';
      const declaration = `\`${isAsync}${shapesStr}${hirString.md.getNamePath(node).join('.')}(${paramsStr})${returnStr}\``;

      const title = node.doc.title;
      const rawExamples = node.doc?.examples || ([] as any[]);
      const examples = rawExamples
        .map((e) => {
          const comment = e.expected ? ` // ${e.expected}` : '';
          return `\`\`\`ts\n${e.code}${comment}\n\`\`\``;
        })
        .join('\n\n')
        .trim();

      return `
#### ${node.name}

${title ? title + '\n' : ''}${examples ? '\nExamples\n\n' + examples + '\n' : ''}
${declaration}
`.trim();
    }

    // =========================================================================
    // Новые атомарные HIR узлы
    // =========================================================================

    // 1. Ссылка на переменную/идентификатор
    case 'VarRefHirn': {
      return node.name;
    }

    // 2. Доступ к свойству (obj.prop)
    case 'MemberAccessHirn': {
      const targetStr = hirToString(node.target);
      const propStr = typeof node.property === 'string' ? node.property : hirToString(node.property);
      return `${targetStr}.${propStr}`;
    }

    // 3. Вызов функции или метода (fn(arg1, arg2))
    case 'CallHirn': {
      const calleeStr = hirToString(node.callee);
      const argsStr = (node.arguments_ || []).map(hirToString).join(', ');
      return `${calleeStr}(${argsStr})`;
    }

    case 'BlockHirn': {
      return '';
    }
    case 'BranchHirn':
    case 'ModuleHirn':
    case 'LoopHirn':
    case 'GoHirn':
    case 'MatchHirn':
    default:
      throw new Error(`Unknown Type: ${(node as any).kind}`);
  }
}
