import * as abstracts from "@razomy/abstracts";

export function functionToString(s: FlatDeclaration<abstracts.translators.FunctionBinding>) {
  const paramsStr = s.node.parameters.map(p => {
    const rest = p.isRest ? '...' : '';
    const typeStr = p.typeIdentifier?.name;
    return `${rest}${p.identifier.name}: ${typeStr}`;
  }).join(', ');
  const returnStr = s.node.returnType?.typeIdentifier.name;
  const isAsync = s.node.isAsync ? 'async ' : '';
  const declaration = `\`${isAsync}${s.path.join('.')}(${paramsStr}): ${returnStr}\``;
  const description = [(s.node as any).title, s.node.description].filter(Boolean).join('\n');
  const examples = (s.node.examples || [])
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
#### ${s.node.identifier.name}

${declaration}

${description}
${examples ? '\nExamples\n\n' + examples : ''}
`.trim();
}

export type FlatDeclaration<T = abstracts.translators.AstLeafType> = {
  node: T,
  description: string;
  name: string;
  path: string[];
};

