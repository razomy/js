import type {FlatDeclaration} from "./function_to_string";
import {typeToString} from "./type_to_string";

export function docTypeToString(s: FlatDeclaration) {
  let declStr = '';
  if (s.node.kind === 'InterfaceTypeBinding') {
    declStr = `interface ${s.node.typeIdentifier.name} ${s.node.extends_.map(i => i.typeIdentifier.name).join(', ')}`;
  } else if (s.node.kind === 'AliasTypeBinding') {
    declStr = `type ${s.node.typeIdentifier.name} = ${typeToString(s.node.type)}`;
  } else if (s.node.kind === 'VariableBinding') {
    const keyword = s.node.isConst ? 'const' : 'let';
    declStr = `${keyword} ${s.node.identifier.name}: ${s.node.typeIdentifier.name}`;
  } else if (s.node.kind === 'EnumBinding') {
    declStr = `enum ${s.node.identifier.name}`;
  }

  const description = s.description;
  return `
#### ${s.name}

${declStr ? `\`${declStr}\`\n\n` : ''}${description}
`.trim();
}
