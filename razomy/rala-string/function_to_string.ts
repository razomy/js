import * as abstracts from '@razomy/abstracts';
import * as array from '@razomy/array';
import * as langMd from "./";

export function functionToString(s: FlatDeclaration<abstracts.translators.FunctionBinding>) {
  const shapes = s.node.shapes.length ?
    `<${s.node.shapes.map(i => i.shapeIdentifier.name).join(', ')}>`
    : '';
  const paramsStr = s.node.parameters
    .map((p) => {
      const rest = array.includes (p.modifiers, 'rest') ? '...' : '';
      const typeStr = langMd.shapeToString(p.shape);
      return `${rest}${p.identifier.name}: ${typeStr}`;
    })
    .join(', ');
  const returnStr = langMd.shapeToString(s.node.return_?.shape || null);
  const isAsync = s.node.modifiers.join(' ');
  const declaration = `\`${isAsync}${s.path.join('.')}${shapes}(${paramsStr}): ${returnStr}\``;
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

export type FlatDeclaration<T = abstracts.translators.DeclarationType> = {
  node: T;
  description: string;
  name: string;
  path: string[];
};
