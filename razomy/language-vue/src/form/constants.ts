import * as abstracts from '@razomy/abstracts';
import type { Ref } from 'vue';
import type {
  HirType,
  BindingHir,
  FunctionHir,
  BlockHir,
  StructHir,
  ReferenceHir,
  BranchHir,
  LiteralHir,
  OperatorHir,
} from '@razomy/abstracts/translators';

export const defaultFormKey = 'form';
export type Path = string[];
export type Value = any;

export interface HasPath {
  path: Path;
}

export interface FormNodeMeta<O = null> {
  errorMessage: string | null;
  isValidating: boolean;
  isDisabled: boolean;
  asyncValidate: ((a: any, b: any) => Promise<string>) | null;
  isReadonly: boolean;
  name: string;
  description: string;
  options: O;
}

export interface FormNode<V = Value, O = null> {
  path: Path;
  meta: FormNodeMeta<O>;
  schema: Schema;
  modelValue: V;
}

export interface EnumOption {
  items: (string | number)[];
}

// Теперь Schema опирается на корневые типы HIR, описывающие данные или функции
export type Schema = HirType;

export const FORM_SUPPORTED_BUILD_IN_KINDS = [
  'String',
  'Number',
  'Boolean',
  'Array<String>',
  'Array<Number>',
  'Date',
  'Color',
  'File',
  'JsonString',
  'Array<File>',
  'Enum',
  'Object',
  'Array',
  'Tuple',
] as const;

export type FormSupportedKind = typeof FORM_SUPPORTED_BUILD_IN_KINDS[number];

export function isSupported(schema: Schema | null): boolean {
  if (!schema) return true;

  switch (schema.kind) {
    case 'BlockHir':
      return (schema as BlockHir).statements.every(isSupported as any);
    case 'BindingHir':
      const binding = schema as BindingHir;
      return binding.shape ? isSupported(binding.shape as Schema) : true;
    case 'FunctionHir':
      const func = schema as FunctionHir;
      return (
        (func.returnShape ? isSupported(func.returnShape as Schema) : true) &&
        func.parameters.every(isSupported as any)
      );
    case 'OperatorHir':
      const binary = schema as OperatorHir;
      // В HIR объединения типов (Union) могут представляться через бинарную операцию '|'
      if (binary.operator === '|') {
        return isSupported(binary.operands[0] as Schema) && isSupported(binary.operands[1] as Schema);
      }
      return false;
    case 'LiteralHir':
    case 'StructHir':
    case 'ReferenceHir':
      // Разрешаем базовые типы, структуры и ссылки
      return true;
    default:
      console.error('Unknown HIR type ' + schema.kind);
      return false;
  }
}

export function getTypeByHirNode(schema: Schema): FormSupportedKind {
  switch (schema.kind) {
    case 'BlockHir':
      // SequenceHir объединяет Array и Tuple. Для упрощения определяем как Array,
      // или можем добавить проверку на Tuple при необходимости (по кол-ву элементов или аннотациям).
      return 'Array';
    case 'StructHir':
      return 'Object';
    case 'LiteralHir':
      const typeStr = typeof (schema as LiteralHir).value;
      if (typeStr === 'number' || typeStr === 'bigint') return 'Number';
      if (typeStr === 'boolean') return 'Boolean';
      return 'String';
    case 'BindingHir':
      const binding = schema as BindingHir;
      return binding.shape ? getTypeByHirNode(binding.shape as Schema) : 'String';
    case 'ReferenceHir':
      const ref = schema as ReferenceHir;
      const refName = (ref as any).syntaxLayer?.name || (ref as any).name;
      switch (refName) {
        case 'Object': return 'Object';
        case 'String': return 'String';
        case 'Boolean': return 'Boolean';
        case 'Number': return 'Number';
        case 'Bigint': return 'Number';
        case 'Null': return 'Number';
        default: return 'String';
      }
    default:
      return 'String';
  }
}

export function buildRegistry(schema: any, typeRegistry: Map<string, any>, visited = new Set()) {
  if (!schema || typeof schema !== 'object' || visited.has(schema)) return;
  visited.add(schema);

  switch (schema.kind) {
    case 'StructHir':
    case 'ObjectHir':
    case 'BindingHir': {
      const name = getNameFromHir(schema);
      if (name && !typeRegistry.has(name)) {
        typeRegistry.set(name, schema);
      }
      break;
    }
  }

  // Обход дерева
  if (Array.isArray(schema)) {
    for (let i = 0; i < schema.length; i++) {
      buildRegistry(schema[i], typeRegistry, visited);
    }
  } else {
    for (const key in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        buildRegistry(schema[key], typeRegistry, visited);
      }
    }
  }
}

export function resolveType(schema: any, typeRegistry: Map<string, any>, visited = new Set()): any {
  if (!schema || visited.has(schema)) return schema;

  switch (schema.kind) {
    case 'ReferenceHir': {
      const name = getNameFromHir(schema);
      if (name && typeRegistry.has(name)) {
        visited.add(schema);
        const resolved = typeRegistry.get(name);

        switch (resolved.kind) {
          case 'BindingHir':
            // Для алиасов типов берем их целевой шейп
            return resolveType(resolved.shape, typeRegistry, visited);
          default:
            return resolveType(resolved, typeRegistry, visited);
        }
      }
      break;
    }
  }

  return schema;
}

export function getSchemaByPath<T = Schema>(rootSchema: Schema, path: Path, typeRegistry: Map<string, any>): T {
  let current: any = rootSchema;

  for (const part of path) {
    current = resolveType(current, typeRegistry);
    if (!current) break;

    // Шаг 1. Пропускаем обертки-биндинги (извлекаем внутренний шейп)
    if (current.kind === 'BindingHir') {
      current = resolveType(current.shape || current.value, typeRegistry);
    }

    if (!current) break;

    // Шаг 2. Ищем следующий элемент по ключу
    switch (current.kind) {
      case 'StructHir': {
        const obj = current as StructHir;
        current = obj.properties
          .filter(i =>i.kind === 'LiteralHir')
          ?.find((e) => {
          const keyName = e.kind === 'LiteralHir'
            ? String(e.value)
            : getNameFromHir(e);
          return keyName === part;
        })?.value;
        break;
      }
      case 'SequenceHir': {
        const seq = current as BlockHir;
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

  return resolveType(current, typeRegistry) as T;
}

export function initFormData(data: any, currentSchema: any, valuesRef: Ref<any>, typeRegistry: Map<string, any>, path: Path = []) {
  currentSchema = resolveType(currentSchema, typeRegistry);

  if (!currentSchema) return;

  switch (currentSchema.kind) {
    case 'BindingHir': {
      const binding = currentSchema as BindingHir;
      initFormData(data, binding.shape || binding.value, valuesRef, typeRegistry, path);
      // Если это литеральная инициализация по умолчанию в схеме
      const datum = binding.value?.kind === 'LiteralHir' ? (binding.value as LiteralHir).value : null;
      if (datum !== null && (data === undefined || data === null)) {
        if (path.length === 0) valuesRef.value = datum;
        else setByPath(valuesRef.value, path, datum);
      }
      break;
    }

    case 'BlockHir': {
      const seq = currentSchema as BlockHir;
      const dataArray = Array.isArray(data) ? data : (data && typeof data === 'object' ? Object.values(data) : []);
      if (path.length === 0) valuesRef.value = dataArray;
      else setByPath(valuesRef.value, path, dataArray);

      // В SequenceHir элементы массива/кортежа лежат в массиве elements
      if (seq.statements && seq.statements.length > 1) {
        // Кортеж (Tuple) - каждому элементу свой тип
        seq.statements.forEach((itemType: any, ix: number) => {
          initFormData(dataArray[ix], itemType, valuesRef, typeRegistry, [...path, String(ix)]);
        });
      } else if (seq.statements && seq.statements.length === 1) {
        // Массив (Array) - тип всех элементов в elements[0]
        const itemType = seq.statements[0];
        dataArray.forEach((item, ix) => {
          initFormData(item, itemType, valuesRef, typeRegistry, [...path, String(ix)]);
        });
      }
      break;
    }

    case 'StructHir': {
      const struct = currentSchema as StructHir;
      const obj = (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
      if (path.length === 0) valuesRef.value = obj;
      else setByPath(valuesRef.value, path, obj);

      struct.properties?.forEach((entry: any) => {
        const key = entry.key.kind === 'LiteralHir'
          ? String(entry.key.value)
          : getNameFromHir(entry.key);
        if (key) {
          initFormData(obj[key], entry.value, valuesRef, typeRegistry, [...path, key]);
        }
      });
      break;
    }

    default: {
      if (data !== undefined && data !== null) {
        if (path.length === 0) valuesRef.value = data;
        else setByPath(valuesRef.value, path, data);
      }
      break;
    }
  }
}

export function getNameFromHir(node: any): string {
  if (!node || typeof node !== 'object') return '';

  // 1. Пытаемся взять имя из синтаксического слоя
  if (node.syntaxLayer?.name) return node.syntaxLayer.name;
  if (node.syntaxLayer?.identifier?.name) return node.syntaxLayer.identifier.name;

  // 2. Фолбэк для прямой совместимости или узлов, у которых поле name лежит на верхнем уровне
  return node.name || '';
}

export function getDescriptionFromHir(node: any): string {
  if (!node || typeof node !== 'object') return '';

  // Описание может находиться в слое документации/метаданных
  if (node.layer?.description) return node.layer.description;
  if (node.syntaxLayer?.description) return node.syntaxLayer.description;
  if (node.semanticLayer?.description) return node.semanticLayer.description;

  // Фолбэк для легаси/вспомогательных узлов
  if (node.meta?.description) return node.meta.description;
  return node.description || '';
}

export function createDefaultMeta(schemaNode: Schema): FormNodeMeta {
  return {
    errorMessage: null,
    isValidating: false,
    isDisabled: false,
    asyncValidate: async () => '',
    isReadonly: false,
    name: getNameFromHir(schemaNode),
    description: getDescriptionFromHir(schemaNode),
    options: null,
  };
}

export function getByPath(obj: any, path: Path) {
  if (!path || path.length === 0) return obj;
  return path.reduce((acc, part) => acc && acc[part], obj);
}

export function setByPath(obj: any, path: Path, value: any) {
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

