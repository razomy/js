import type { Ref } from 'vue';
import type { BindingHirn, BlockHirn, IIdentityHirn, LiteralHirn, StructHirn } from '@razomy/abstractions/hir';
import type { EnumOption, FormNodeMeta, SchemaType } from './types';
import type { FormSupportedKind } from './constants';
import type { PathArray } from '@razomy/abstractions/path';

export function isSchemaValid(node: SchemaType | null): boolean {
  if (node === null) return true;

  switch (node.kind) {
    case 'BlockHirn':
      return node.statements.every(isSchemaValid);
    case 'BindingHirn':
      return node.shape ? isSchemaValid(node.shape) : true;
    case 'FunctionHirn':
      return (
        (node.returnShape ? isSchemaValid(node.returnShape) : true) &&
        node.parameters.every(isSchemaValid) &&
        isSchemaValid(node.block)
      );
    case 'OperatorHirn':
      return isSchemaValid(node.operands[0]) && isSchemaValid(node.operands[1]);
    case 'LiteralHirn':
      if (node.value === 'string' || node.value === 'boolean' || node.value === 'number' || node.value === 'bigint') {
        return true;
      }
      return true;
    case 'StructHirn':
      return node.properties.every(isSchemaValid);
    case 'ReferenceHirn':
      return isSchemaValid(node.target);
    default:
      console.error('Unknown HIR type ' + node.kind);
      return false;
  }
  return false;
}

export function getTypeByHirNode(node: SchemaType): FormSupportedKind {
  switch (node.kind) {
    case 'BlockHirn':
      return 'Array';
    case 'FunctionHirn':
      return 'Function';
    case 'OperatorHirn':
      return 'Union';
    case 'StructHirn':
      if (node.modifiers.isEnum) {
        return 'Enum';
      }
      return 'Object';
    case 'LiteralHirn': {
      const typeStr = node.value;
      switch (typeStr) {
        case 'object':
          return 'Object';
        case 'string':
          return 'String';
        case 'boolean':
          return 'Boolean';
        case 'number':
          return 'Number';
        case 'bigint':
          return 'Number';
        case 'null':
          return 'Number';
        default:
          return 'String';
      }
    }
    case 'BindingHirn':
      return 'Binding';
    case 'ReferenceHirn':
      return getTypeByHirNode(node.target);
    default:
      return 'String';
  }
}

export function buildSchemaRegistry(schema: SchemaType, typeRegistry: Map<string, SchemaType>, visited = new Set()) {
  if (!schema || typeof schema !== 'object' || visited.has(schema)) return;
  visited.add(schema);

  switch (schema.kind) {
    case 'StructHirn':
    case 'FunctionHirn':
    case 'BindingHirn': {
      const name = schema.name;
      if (name && !typeRegistry.has(name)) {
        typeRegistry.set(name, schema);
      }
      break;
    }
  }

  // Обход дерева
  if (Array.isArray(schema)) {
    for (let i = 0; i < schema.length; i++) {
      buildSchemaRegistry(schema[i], typeRegistry, visited);
    }
  } else {
    for (const key in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        buildSchemaRegistry(schema[key], typeRegistry, visited);
      }
    }
  }
}

export function getSchemaByPath<T = SchemaType>(
  rootSchema: SchemaType,
  path: PathArray,
  typeRegistry: Map<string, SchemaType>,
): T {
  let current: SchemaType = rootSchema;

  for (const part of path) {
    if (!current) break;

    // Шаг 2. Ищем следующий элемент по ключу
    switch (current.kind) {
      case 'BindingHirn': {
        if (current.shape?.['name']) {
          current = current.shape;
        } else if (current.value['name']) {
          current = current.value;
        } else if (current.shape?.['operator']) {
          current = current.shape;
        } else if (part === 'default') {
          current = current.value;
        }
        break;
      }
      case 'FunctionHirn': {
        current = current.parameters.find((i) => i.name === part);
        break;
      }
      case 'OperatorHirn': {
        current = current.operands.find((i) => i['name'] === part);
        break;
      }
      case 'StructHirn': {
        const obj = current as StructHirn;
        current = obj.properties
          .filter((i) => i.kind === 'BindingHirn')
          .find((e) => {
            return e.name === part;
          });
        break;
      }
      case 'BlockHirn': {
        const seq = current as BlockHirn;
        // Если это массив с одним типом (Array), то берем [0]. Если кортеж (Tuple) - берем по индексу part.
        current = seq.statements?.[parseInt(part as string, 10)] || seq.statements?.[0];
        break;
      }
      default: {
        current = null;
        break;
      }
    }
  }

  return current as T;
}

export function initFormData(
  data: any,
  currentSchema: SchemaType,
  valuesRef: Ref<any>,
  typeRegistry: Map<string, SchemaType>,
  path: PathArray = [],
) {
  let node = currentSchema;
  if (!node) return;

  switch (node.kind) {
    case 'BindingHirn': {
      initFormData(data, node.shape || node.value, valuesRef, typeRegistry, path);
      // Если это литеральная инициализация по умолчанию в схеме
      const datum = node.value?.kind === 'LiteralHirn' ? (node.value as LiteralHirn).value : null;
      if (datum !== null && (data === undefined || data === null)) {
        if (path.length === 0) valuesRef.value = datum;
        else setByPath(valuesRef.value, path, datum);
      }
      break;
    }

    case 'ReferenceHirn': {
      initFormData(data, node.target, valuesRef, typeRegistry, path);
      // Если это литеральная инициализация по умолчанию в схеме
      const datum = node.target?.kind === 'LiteralHirn' ? (node.target as LiteralHirn).value : null;
      if (datum !== null && (data === undefined || data === null)) {
        if (path.length === 0) valuesRef.value = datum;
        else setByPath(valuesRef.value, path, datum);
      }
      break;
    }

    case 'ModuleHirn':
    case 'BlockHirn': {
      const dataArray = Array.isArray(data) ? data : data && typeof data === 'object' ? Object.values(data) : [];
      if (path.length === 0) valuesRef.value = dataArray;
      else setByPath(valuesRef.value, path, dataArray);

      // В SequenceHirn элементы массива/кортежа лежат в массиве elements
      if (node.statements && node.statements.length > 1) {
        // Кортеж (Tuple) - каждому элементу свой тип
        node.statements.forEach((itemType: any, ix: number) => {
          initFormData(dataArray[ix], itemType, valuesRef, typeRegistry, [...path, String(ix)]);
        });
      } else if (node.statements && node.statements.length === 1) {
        // Массив (Array) - тип всех элементов в elements[0]
        const itemType = node.statements[0];
        dataArray.forEach((item, ix) => {
          initFormData(item, itemType, valuesRef, typeRegistry, [...path, String(ix)]);
        });
      }
      break;
    }

    case 'FunctionHirn': {
      const obj = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
      if (path.length === 0) valuesRef.value = obj;
      else setByPath(valuesRef.value, path, obj);

      node.parameters?.forEach((entry) => {
        const key = entry.kind === 'BindingHirn' ? String(entry.value) : entry.name;
        if (key) {
          initFormData(obj[key], entry.value, valuesRef, typeRegistry, [...path, key]);
        }
      });
      break;
    }

    case 'StructHirn': {
      if (node.modifiers.isEnum) {
        const obj = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
        if (path.length === 0) valuesRef.value = obj;
        else setByPath(valuesRef.value, path, obj);

        node.properties?.forEach((entry) => {
          const key = entry.kind === 'BindingHirn' ? String(entry.value) : entry.name;
          if (key) {
            initFormData(obj[key], entry, valuesRef, typeRegistry, [...path, key]);
          }
        });
        break;
      }

      const obj = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
      if (path.length === 0) valuesRef.value = obj;
      else setByPath(valuesRef.value, path, obj);

      node.properties?.forEach((entry) => {
        const key = entry.kind === 'BindingHirn' ? String(entry.value) : entry.name;
        if (key) {
          initFormData(obj[key], entry, valuesRef, typeRegistry, [...path, key]);
        }
      });
      break;
    }
    case 'LiteralHirn': {
      if (data !== undefined && data !== null) {
        if (path.length === 0) valuesRef.value = data;
        else setByPath(valuesRef.value, path, data);
      }
      break;
    }
    default:
      throw new Error('Unknown type' + JSON.stringify(node));
  }
}

export function getDescriptionFromHir(node: IIdentityHirn): string {
  if (!node || typeof node !== 'object') return '';
  return node?.doc?.description || '';
}

export function createDefaultMeta(node: SchemaType): FormNodeMeta {
  const def = {
    errorMessage: null,
    isValidating: false,
    isDisabled: false,
    asyncValidate: async () => '',
    isReadonly: false,
    name: (node as any).name,
    description: getDescriptionFromHir(node as any),
    options: null,
  };

  if (node.kind === 'StructHirn' && node.modifiers.isEnum) {
    def.options = {
      items: (node.properties as BindingHirn[]).map((i) => i.value as LiteralHirn).map((i) => i.value as string),
    } satisfies EnumOption;
  }

  return def;
}

export function getByPath(obj: any, path: PathArray) {
  if (!path || path.length === 0) return obj;
  return path.reduce((acc, part) => acc && acc[part], obj) || null;
}

export function setByPath(obj: any, path: PathArray, value: any) {
  if (!path || path.length === 0) throw Error('path must be a valid path');
  const parts = [...path];
  const last = parts.pop()!;
  const target = parts.reduce((acc, part, index) => {
    if (!(part in acc) || acc[part] === null || acc[part] === undefined) {
      const nextPart = path[index + 1];
      acc[part] = /^\d+$/.test(nextPart!) ? [] : {};
    }
    return acc[part];
  }, obj);
  target[last] = value;
}
