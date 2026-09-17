import * as abstracts from '@razomy/abstracts';

function modifiersToLiterals(struct: (abstracts.translators.FunctionHir | abstracts.translators.BindingHir | abstracts.translators.StructHir)) {
  return struct.modifiers
    .filter(i => i.kind === 'LiteralHir')
    .map(i => i.value)
    .join(' ')
    ;
}

export function hirToString(node: abstracts.meta.NullOptional<abstracts.translators.HirType>): string {
  if (!node) {
    throw new Error("Unknown Type");
  }

  switch (node.kind) {
    case 'LiteralHir': {
      if (typeof node.value === 'string') {
        return `"${node.value}"`;
      }
      return String(node.value);
    }
    case 'OperatorHir': {
      if (node.operands.length === 1) {
        return `${node.operator}${hirToString(node.operands[0])}`;
      }
      if (node.operands.length === 2) {
        return `${node.operands.map(hirToString).join(' + ')}`;
      }
      return `${node.operator}`;
    }
    case 'BindingHir': {
      const prefix = node.name;
      const postfix = node.value;
      const modifiers = modifiersToLiterals(node);
      const isConst = modifiers.includes('const');
      const keyword = modifiers ? `${modifiers} ` : (isConst ? 'const ' : 'let ');
      const shape = node.shape ? hirToString(node.shape) : '';

      if (prefix && postfix) {
        return `${keyword} ${prefix} ${shape} = ${postfix}`.trim();
      } else if (prefix) {
        return `${keyword} ${prefix} ${shape}`.trim();
      } else if (postfix) {
        return `${keyword} ${postfix} ${shape}`.trim();
      }
      return '';
    }
    case 'StructHir': {
      const struct = node as abstracts.translators.StructHir;
      const fieldEntries = Object.entries(struct.properties || {}).map(
        ([fieldName, fieldShape]) => `${fieldName}: ${hirToString(fieldShape)}`
      );
      const modifiers = modifiersToLiterals(struct);
      const keyword = modifiers ? `${modifiers} ` : '';
      const extendsClause = '';
      // struct. && struct.extendsShapes.length > 0
      //   ? ` extends ${struct.extendsShapes.map((i) => languageString.shapeToString(i)).join(', ')}`
      //   : '';
      return `\n${keyword}${struct.name}${extendsClause} \n{ ${fieldEntries.join(', ')} }\n`;
    }

    case 'FunctionHir': {
      // const modifiers = modifiersToLiterals(node);
      // const isAsync = modifiers.includes('async') ? 'async ' : '';

      // Generic-параметры (если переданы в метаданных/синтаксисе)
      // const generics = node.typeParameters || node.shapes;
      // const shapesStr = Array.isArray(generics) && generics.length
      //   ? `<${generics.map((g: any) => g.name || hirToString(g)).join(', ')}>`
      //   : '';

      // const paramsStr = (node.parameters || [])
      //   .map((p) => {
      //     const pModifiers = (p.modifiers || []).map((m) => m.type);
      //     const isRest = pModifiers.includes('rest') ? '...' : '';
      //     const isOptional = pModifiers.includes('optional') ? '?' : '';
      //     const pName = (p).syntaxLayer?.name || (p).name || 'arg';
      //     const typeStr = hirToString(p.shape);
      //     return `${isRest}${pName}${isOptional}: ${typeStr}`;
      //   })
      //   .join(', ');

      // const returnStr = hirToString(node.returnShape);
      // const declaration = `\`${isAsync}${s.path.join('.')}${shapesStr}(${paramsStr}): ${returnStr}\``;

      const title = node.title?.value;
      const description = node.description?.value;

      const rawExamples = node?.examples?.value || [] as any[];
      const examples = rawExamples
        .map((e: any) => {
          const comment = e.expected ? ` // ${e.expected}` : '';
          return `\`\`\`ts\n${e.code}${comment}\n\`\`\``;
        })
        .join('\n\n')
        .trim();

      return `
#### ${node.name}

${title ? title + '\n' : ''}${description ? description + '\n' : ''}${examples ? '\nExamples\n\n' + examples + '\n' : ''}
`.trim();
    }

    case 'ReferenceHir':
      if (node.arguments_.length > 0) {
        return `${node.target}<${node.arguments_.map(hirToString).join(', ')}>`;
      }
      return `${node.target}`;

    case 'BlockHir': {
      return ''
    }
    case 'BranchHir':
    case 'LoopHir':
    case 'GoHir':
    case 'MatchHir':
    default:
      throw new Error("Unknown Type");
  }
}
