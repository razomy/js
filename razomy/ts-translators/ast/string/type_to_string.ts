import * as abstracts from "@razomy/abstracts";

export function typeToString(type: abstracts.translators.TypeType | null): string {
  if (!type) return 'any';
  switch (type.kind) {
    case 'KeywordType':
      return type.name;
    case 'ReferenceType':
      return type.typeIdentifier.name;
    case 'ArrayType': {
      const inner = typeToString(type.type);
      return inner.includes(' ') ? `(${inner})[]` : `${inner}[]`;
    }
    case 'TupleType':
      return `[${type.types.map(typeToString).join(', ')}]`;
    case 'UnionType':
      return type.types.map(typeToString).join(' | ');
    case 'IntersectionType':
      return type.types.map(typeToString).join(' & ');
    case 'GenericReferenceType':
      return `${type.typeIdentifier.name}<${type.types.map(typeToString).join(', ')}>`;
    case 'StringType':
      return `"${type.value}"`;
    case 'NumberType':
      return `${type.value}`;
    case 'BooleanType':
      return `${type.value}`;
    case 'NullType':
      return 'null';
    case 'UndefinedType':
      return 'undefined';
    case 'BigIntType':
      return `${type.value}n`;
    case 'RegExpType':
      return type.value;
    case 'ObjectType':
      return `{ ${type.properties.map(p => `${p.typeIdentifier.name}: ${typeToString(p.type)}`).join(', ')} }`;
    case 'FunctionType':
      return `(${type.parameters.map(p => `${p.typeIdentifier.name}: ${typeToString(p.type)}`).join(', ')}) => ${type.returnType?.typeIdentifier.name}`;
    case 'TemplateType':
      return `\`${type.template}\``;
    case 'MappedType':
      return `{ [${type.identifier.name} in ${typeToString(type.constraint)}]: ${typeToString(type.type)} }`;
    default:
      return 'any';
  }
}
