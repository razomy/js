import * as abstracts from "@razomy/abstracts";


function typeToString(type: abstracts.ast.TypeType | null): string {
  if (!type) return 'any';
  switch (type.kind) {
    case 'KeywordType': return type.name;
    case 'ReferenceType': return type.identifier.name;
    case 'ArrayType': {
      const inner = typeToString(type.type);
      return inner.includes(' ') ? `(${inner})[]` : `${inner}[]`;
    }
    case 'TupleType': return `[${type.types.map(typeToString).join(', ')}]`;
    case 'UnionType': return type.types.map(typeToString).join(' | ');
    case 'IntersectionType': return type.types.map(typeToString).join(' & ');
    case 'GenericReferenceType': return `${type.identifier.name}<${type.types.map(typeToString).join(', ')}>`;
    case 'StringType': return `"${type.value}"`;
    case 'NumberType': return `${type.value}`;
    case 'BooleanType': return `${type.value}`;
    case 'NullType': return 'null';
    case 'UndefinedType': return 'undefined';
    case 'BigIntType': return `${type.value}n`;
    case 'RegExpType': return type.value;
    case 'ObjectType': return `{ ${type.properties.map(p => `${p.identifier.name}: ${typeToString(p.type)}`).join(', ')} }`;
    case 'FunctionType': return `(${type.parameters.map(p => `${p.identifier.name}: ${typeToString(p.type)}`).join(', ')}) => ${typeToString(type.return_)}`;
    case 'TemplateType': return `\`${type.template}\``;
    case 'MappedType': return `{ [${type.identifier.name} in ${typeToString(type.constraint)}]: ${typeToString(type.type)} }`;
    default: return 'any';
  }
}

export function functionToString(s: { decl: abstracts.ast.FunctionDeclaration, path: string[] }) {
    const paramsStr = s.decl.parameters.map(p => {
            const rest = p.isRest ? '...' : '';
            const typeStr = typeToString(p.type);
            return `${rest}${p.identifier.name}: ${typeStr}`;
          }).join(', ');
    const returnStr = typeToString(s.decl.return_.type);
    const isAsync = s.decl.isAsync ? 'async ' : '';
    const declaration = `\`${isAsync}${s.path.join('.')}(${paramsStr}): ${returnStr}\``;
    const description = [(s.decl as any).title, s.decl.description].filter(Boolean).join('\n');
    const examples = (s.decl.examples || [])
            .map((e) => {
              const comment = e.expected ? ` // ${e.expected}` : '';
              return `
\`\`\`ts
${e.code}${comment}
\`\`\`
`.trim();
            })
            .join('\n\n').trim();
    return `
#### ${s.decl.identifier.name}

${declaration}

${description}
${examples ? '\nExamples\n\n' + examples : ''}
`.trim();
}
