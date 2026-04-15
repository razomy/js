import * as abstracts from '@razomy/abstracts';

export function functionToString(s: FlatDeclaration<abstracts.translators.FunctionBinding>) {
  const paramsStr = s.node.parameters
    .map((p) => {
      const rest = p.isRest ? '...' : '';
      const typeStr = p.shapeIdentifier?.name;
      return `${rest}${p.identifier.name}: ${typeStr}`;
    })
    .join(', ');
  const returnStr = s.node.returnType?.shapeIdentifier.name;
  const isAsync = s.node.modifiers.join(' ');
  const declaration = `\`${isAsync}${s.path.join('.')}(${paramsStr}): ${returnStr}\``;
  const description = [(s.node as any).title, s.node.meta.description].filter(Boolean).join('\n');
  const examples = (s.node.meta.examples || [])
    .map((e) => {
      const comment = e.expected ? ` // ${e.expected}` : '';
      return `
\`\`\`ts
${e.code}${comment}
\`\`\`
`.trim();
    })
    .join('\n\n')
    .trim();
  return `
#### ${s.node.identifier.name}

${declaration}

${description}
${examples ? '\nExamples\n\n' + examples : ''}
`.trim();
}

export type FlatDeclaration<T = abstracts.translators.SbsbType> = {
  node: T;
  description: string;
  name: string;
  path: string[];
};
