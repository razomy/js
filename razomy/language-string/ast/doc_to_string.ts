import * as languageString from "@razomy/language-string";
import * as abstracts from "@razomy/abstracts";

export function docToString(s: languageString.FlatDeclaration): string {
  let declStr = '';

  if (s.node.kind === 'StructHir') {
    const struct = s.node as abstracts.translators.StructHir;
    const modifiers = (struct.modifiers || []).map((m: abstracts.translators.ModifierHir) => m.type).join(' ');
    const keyword = modifiers ? `${modifiers} ` : '';
    const extendsClause =
      struct.extendsShapes && struct.extendsShapes.length > 0
        ? ` extends ${struct.extendsShapes.map((i) => languageString.shapeToString(i)).join(', ')}`
        : '';
    declStr = `${keyword}struct ${s.name}${extendsClause}`;
  } else if (s.node.kind === 'BindingHir') {
    const binding = s.node as abstracts.translators.BindingHir;
    const modifiers = (binding.modifiers || []).map((m: abstracts.translators.ModifierHir) => m.type).join(' ');
    const isConst = modifiers.includes('const');
    const keyword = modifiers ? `${modifiers} ` : (isConst ? 'const ' : 'let ');

    if (!binding.value && binding.shape) {
      // Type alias binding
      declStr = `type ${s.name} = ${languageString.shapeToString(binding.shape)}`;
    } else {
      // Variable binding
      const shapeStr = binding.shape ? `: ${languageString.shapeToString(binding.shape)}` : '';
      declStr = `${keyword}${s.name}${shapeStr}`;
    }
  } else if (s.node.kind === 'FunctionHir') {
    return languageString.functionToString(s as any);
  } else {
    throw new Error(`Unknown Doc kind "${(s.node as any).kind}"`);
  }

  const description = s.description;
  return `
#### ${s.name}

${declStr ? `\`${declStr}\`\n\n` : ''}${description}
`.trim();
}
