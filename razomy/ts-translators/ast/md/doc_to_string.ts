import type {FlatDeclaration} from "./function_to_string";
import {shapeToString} from "./shape_to_string";

export function docToString(s: FlatDeclaration) {
  let declStr = '';
  if (s.node.kind === 'InterfaceShapeBinding') {
    declStr = `interface ${s.node.shapeIdentifier.name} ${s.node.extends_.map(i => i.shapeIdentifier.name).join(', ')}`;
  } else if (s.node.kind === 'AliasShapeBinding') {
    declStr = `type ${s.node.shapeIdentifier.name} = ${shapeToString(s.node.shape)}`;
  } else if (s.node.kind === 'VariableBinding') {
    const keyword = s.node.modifiers.length ? s.node.modifiers.join(' ') : '';
    declStr = `${keyword} ${s.node.identifier.name}: ${s.node.shapeIdentifier?.name}`;
  } else if (s.node.kind === 'EnumBinding') {
    declStr = `enum ${s.node.identifier.name}`;
  }

  const description = s.description;
  return `
#### ${s.name}

${declStr ? `\`${declStr}\`\n\n` : ''}${description}
`.trim();
}
