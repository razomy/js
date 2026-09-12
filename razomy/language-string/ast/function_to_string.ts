import * as languageString from "@razomy/language-string";
import * as abstracts from "@razomy/abstracts";

export type FlatDeclaration<T = abstracts.translators.HirType> = {
  node: T;
  description: string;
  name: string;
  path: string[];
};

export function functionToString(s: FlatDeclaration<abstracts.translators.FunctionHir>): string {
  const modifiers = (s.node.modifiers || []).map((m: abstracts.translators.ModifierHir) => m.type);
  const isAsync = modifiers.includes('async') ? 'async ' : '';

  // Generic-параметры (если переданы в метаданных/синтаксисе)
  const generics = (s.node as any).typeParameters || (s.node as any).shapes;
  const shapesStr = Array.isArray(generics) && generics.length
    ? `<${generics.map((g: any) => g.name || languageString.shapeToString(g)).join(', ')}>`
    : '';

  const paramsStr = (s.node.parameters || [])
    .map((p) => {
      const pModifiers = (p.modifiers || []).map((m: abstracts.translators.ModifierHir) => m.type);
      const isRest = pModifiers.includes('rest') ? '...' : '';
      const isOptional = pModifiers.includes('optional') ? '?' : '';
      const pName = (p as any).syntaxLayer?.name || (p as any).name || 'arg';
      const typeStr = languageString.shapeToString(p.shape);
      return `${isRest}${pName}${isOptional}: ${typeStr}`;
    })
    .join(', ');

  const returnStr = languageString.shapeToString(s.node.returnShape);
  const declaration = `\`${isAsync}${s.path.join('.')}${shapesStr}(${paramsStr}): ${returnStr}\``;

  const syntax = (s.node as any).syntaxLayer;
  const meta = (s.node as any).meta;
  const title = (s.node as any).title || syntax?.title;
  const description = [title, s.description].filter(Boolean).join('\n');

  const rawExamples = meta?.examples || syntax?.examples || [];
  const examples = rawExamples
    .map((e: any) => {
      const comment = e.expected ? ` // ${e.expected}` : '';
      return `\`\`\`ts\n${e.code}${comment}\n\`\`\``;
    })
    .join('\n\n')
    .trim();

  return `
#### ${s.name}

${declaration}

${description}
${examples ? '\nExamples\n\n' + examples : ''}
`.trim();
}
