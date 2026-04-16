import * as abstracts from '@razomy/abstracts';

export function shapeToString(type: abstracts.translators.ShapeType | null): string {
  if (!type) return 'any';

  switch (type.kind) {
    case 'BuildInShape':
      return String(type.value);
    case 'ShapeIdentifier':
      return type.name;
    case 'ReturnShape':
      return shapeToString(type.shape);
    case 'ReferenceShape':
      if (type.shapes.length > 0) {
        return `${type.shapeIdentifier.name}<${type.shapes.map(shapeToString).join(', ')}>`;
      }
      return type.shapeIdentifier.name;
    case 'ArrayShape':
      if (type.type === 'Array') {
        return `${type.shapes.map(shapeToString).join(', ')}[]`;
      }
      return `[${type.shapes.map(shapeToString).join(', ')}]`;
    case 'UnionShape':
      return type.shapes.map(shapeToString).join(' | ');
    case 'IntersectionShape':
      return type.shapes.map(shapeToString).join(' & ');
    case 'ObjectShape':
      return `{ ${type.properties.map((p) => `${p.shapeIdentifier.name}: ${shapeToString(p.shape)}`).join(', ')} }`;
    case 'FunctionShape':
      const shapes = type.shapes.length ?
        `<${type.shapes.map(i => i.shapeIdentifier.name).join(', ')}>`
      : '';
      const params = `(${type.parameters
      .map((p) => `${p.shapeIdentifier.name}: ${shapeToString(p.shape)}`)
      .join(', ')})`;
      return `${shapes}${params} => ${shapeToString(type.return_)}`;
    case 'TemplateShape':
      return `\`${type.template}\``;
    case 'MappedShape':
      return `{ [${type.shapeIdentifier.name} in ${shapeToString(type.constraint)}]: ${shapeToString(type.shape)} }`;
    default:
      // throw new Error(`Unknown type ${type.kind}`);
      return 'any';
  }
}
