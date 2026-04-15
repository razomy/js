import * as tsTranslators from '@razomy/ts-translators';
import {shapeToString} from "./shape_to_string";

export function docToString(s: tsTranslators.ast.md.FlatDeclaration) {
  let declStr = '';
  if (s.node.kind === 'InterfaceShapeBinding') {
    declStr = `interface ${s.node.shapeIdentifier.name} ${s.node.extends_
      .map((i) => shapeToString(i))
      .join(', ')}`;
  } else if (s.node.kind === 'AliasShapeBinding') {
    declStr = `type ${s.node.shapeIdentifier.name} = ${tsTranslators.ast.md.shapeToString(s.node.shape)}`;
  } else if (s.node.kind === 'VariableBinding') {
    const keyword = s.node.modifiers.length ? s.node.modifiers.join(' ') : '';
    declStr = `${keyword} ${s.node.identifier.name}: ${shapeToString(s.node.shape)}`;
  } else if (s.node.kind === 'EnumBinding') {
    declStr = `enum ${s.node.identifier.name}`;
  }else if (s.node.kind === 'ClassBinding') {
    declStr = `class ${s.node.identifier.name}`;
  } else {
    throw new Error(`Unknown Doc "${s.node.kind}"`);
  }

  const description = s.description;
  return `
#### ${s.name}

${declStr ? `\`${declStr}\`\n\n` : ''}${description}
`.trim();
}
