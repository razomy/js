import * as abstracts from '@razomy/abstracts';
import type { HirType, FunctionHir, StructHir, ModifierHir } from '@razomy/abstracts/translators';

export function shapeToString(type: abstracts.meta.NullOptional<HirType>): string {
  if (!type) return 'any';

  switch (type.kind) {
    case 'LiteralHir':
      if (typeof type.value === 'string') {
        return `"${type.value}"`;
      }
      return String(type.value);

    case 'ReferenceHir':
      const name = (type as any).name || (type as any).syntaxLayer?.name || `Symbol#${type.targetSymbol}`;
      const typeArgs = (type as any).typeArguments || (type as any).shapes;
      if (Array.isArray(typeArgs) && typeArgs.length > 0) {
        return `${name}<${typeArgs.map(shapeToString).join(', ')}>`;
      }
      return name;

    case 'SequenceHir':
      if (type.elements.length === 1) {
        return `${shapeToString(type.elements[0])}[]`;
      }
      return `[${type.elements.map(shapeToString).join(', ')}]`;

    case 'ObjectHir':
      if (!type.entries || type.entries.length === 0) return '{}';
      return `{ ${type.entries
        .map((e) => {
          const keyStr = e.key.kind === 'LiteralHir' ? String(e.key.value) : shapeToString(e.key);
          return `${keyStr}: ${shapeToString(e.value)}`;
        })
        .join(', ')} }`;

    case 'StructHir': {
      const struct = type as StructHir;
      const fieldEntries = Object.entries(struct.fields || {}).map(
        ([fieldName, fieldShape]) => `${fieldName}: ${shapeToString(fieldShape)}`
      );
      return `{ ${fieldEntries.join(', ')} }`;
    }

    case 'BinaryHir': {
      // Объединения (|) и пересечения (&)
      if (type.operator === '|' || type.operator === '&') {
        return `${shapeToString(type.left)} ${type.operator} ${shapeToString(type.right)}`;
      }
      return `${shapeToString(type.left)} ${type.operator} ${shapeToString(type.right)}`;
    }

    case 'UnaryHir':
      return `${type.operator}${shapeToString(type.operand)}`;

    case 'FunctionHir': {
      const fn = type as FunctionHir;
      const params = fn.parameters
        .map((p) => {
          const pName = (p as any).syntaxLayer?.name || (p as any).name || 'arg';
          const pShape = shapeToString(p.shape);
          const isRest = p.modifiers?.some((m: ModifierHir) => m.type === 'rest');
          return `${isRest ? '...' : ''}${pName}: ${pShape}`;
        })
        .join(', ');
      return `(${params}) => ${shapeToString(fn.returnShape)}`;
    }

    case 'TemplateHir':
      return `\`${type.values.map(shapeToString).join('')}\``;

    case 'CastHir':
      return shapeToString(type.targetShape);

    default:
      return (type as any).syntaxLayer?.name || 'any';
  }
}
