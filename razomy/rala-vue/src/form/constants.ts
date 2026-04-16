import * as abstracts from '@razomy/abstracts';
import type { Ref } from 'vue';

export const defaultFormKey = 'form';
export type Path = string[];
export type Value = any;

export interface WithPath {
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

// Обновленные типы в соответствии с новым AST
export type Schema =
  | abstracts.translators.ShapeType
  | abstracts.translators.ParameterBinding
  | abstracts.translators.FunctionBinding;

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
    case 'ArrayShape':
      return schema.shapes.every(isSupported as any);
    case 'ParameterBinding':
      return schema.shape ? isSupported(schema.shape as Schema) : true;
    case 'FunctionBinding':
      return (
        (schema.return_ ? isSupported(schema.return_ as Schema) : true) &&
        schema.parameters.every(isSupported as any)
      );
    case 'ReturnShape':
      return isSupported(schema.shape as Schema);
    case 'UnionShape':
      return schema.shapes.every(isSupported as any);
    case 'BuildInShape':
      switch (schema.type) {
        case 'Object': return true;
        case 'String': return true;
        case 'Boolean': return true;
        case 'Number': return true;
        case 'Bigint': return true;
        case 'Null': return true;
        default: return false;
      }
    case 'ReferenceShape':
    case 'ShapeIdentifier':
      return true; // Разрешаем ссылки для последующего резолва
    default:
      console.error('Unknown type ' + schema.kind);
      return false;
  }
}

export function getTypeByAstNode(schema: Schema): FormSupportedKind {
  switch (schema.kind) {
    case 'ArrayShape':
      switch (schema.type) {
        case 'Array': return 'Array';
        case 'Tuple': return 'Tuple';
        default: throw new Error('Unknown array type ' + schema);
      }
    case 'BuildInShape':
      switch (schema.type) {
        case 'Object': return 'Object';
        case 'String': return 'String';
        case 'Boolean': return 'Boolean';
        case 'Number': return 'Number';
        case 'Bigint': return 'Number';
        case 'Null': return 'Number';
        default: throw new Error('Unknown BuildInShape ' + schema.type);
      }
    case 'ParameterBinding':
      return getTypeByAstNode(schema.shape as Schema);
    case 'ReturnShape':
      return getTypeByAstNode(schema.shape as Schema);
    case 'ShapeIdentifier':
      switch (schema.name) {
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

  // Используем switch вместо цепочки if
  switch (schema.kind) {
    case 'InterfaceShapeBinding':
    case 'AliasShapeBinding':
    case 'ClassBinding':
    case 'ObjectShape': {
      // Поддержка нового поля shapeIdentifier и старого/существующего identifier
      const name = schema.shapeIdentifier?.name || schema.identifier?.name;
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

  // Ранее ReferenceType, теперь ReferenceShape или ShapeIdentifier
  switch (schema.kind) {
    case 'ReferenceShape':
    case 'ShapeIdentifier': {
      const name = schema.shapeIdentifier?.name || schema.name;
      if (name && typeRegistry.has(name)) {
        visited.add(schema);
        const resolved = typeRegistry.get(name);

        switch (resolved.kind) {
          case 'AliasShapeBinding':
            return resolveType(resolved.shape, typeRegistry, visited); // В новом AST это shape, а не type
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

    // Шаг 1. Пропускаем обертки-биндинги (PropertyShape, PropertyBinding, ParameterBinding)
    switch (current.kind) {
      case 'PropertyShape':
      case 'PropertyBinding':
      case 'ParameterBinding':
        // В новом AST используется `shape` вместо `type` и `expression`
        current = resolveType(current.shape || current.expression, typeRegistry);
        break;
    }

    if (!current) break;

    // Шаг 2. Ищем следующий элемент по ключу в зависимости от структуры
    switch (current.kind) {
      case 'ObjectShape':
      case 'InterfaceShapeBinding':
      case 'ClassBinding': {
        current = current.properties?.find((p: any) =>
          p.shapeIdentifier?.name === part || p.identifier?.name === part
        );
        break;
      }
      case 'ArrayShape': {
        switch (current.type) {
          case 'Tuple':
            // В новом AST элементы массива/кортежа лежат в массиве shapes
            current = current.shapes?.[parseInt(part as string, 10)];
            break;
          case 'Array':
            current = current.shapes?.[0]; // Для обычного массива тип всех элементов один и лежит в 0-м индексе
            break;
          default:
            current = null;
        }
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

  switch (currentSchema.kind) {
    case 'ParameterBinding': {
      initFormData(data, currentSchema.shape || currentSchema.expression, valuesRef, typeRegistry, path);
      const datum = currentSchema.expression?.value || null;
      if (path.length === 0) valuesRef.value = datum;
      else setByPath(valuesRef.value, path, datum);
      break;
    }

    case 'ArrayShape': {
      const dataArray = Array.isArray(data) ? data : (data && typeof data === 'object' ? Object.values(data) : []);
      if (path.length === 0) valuesRef.value = dataArray;
      else setByPath(valuesRef.value, path, dataArray);

      switch (currentSchema.type) {
        case 'Tuple':
          currentSchema.shapes?.forEach((itemType: any, ix: number) => {
            initFormData(dataArray[ix], itemType, valuesRef, typeRegistry, [...path, String(ix)]);
          });
          break;
        case 'Array':
        default:
          const itemType = currentSchema.shapes?.[0]; // Базовый тип массива
          dataArray.forEach((item, ix) => {
            initFormData(item, itemType, valuesRef, typeRegistry, [...path, String(ix)]);
          });
          break;
      }
      break;
    }

    case 'ObjectShape':
    case 'InterfaceShapeBinding':
    case 'ClassBinding': {
      const obj = (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
      if (path.length === 0) valuesRef.value = obj;
      else setByPath(valuesRef.value, path, obj);

      currentSchema.properties?.forEach((prop: any) => {
        const key = prop.shapeIdentifier?.name || prop.identifier?.name;
        if (key) {
          initFormData(obj[key], prop.shape || prop.expression, valuesRef, typeRegistry, [...path, key]);
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


export function getNameFromAst(node: any): string {
  if (!node || typeof node !== 'object') return '';

  switch (node.kind) {
    // 1. Узлы, которые непосредственно содержат имя
    case 'Identifier':
    case 'ShapeIdentifier':
    case 'ConceptIdentifier':
      return node.name || '';

    // 2. Биндинги и выражения с полем identifier
    case 'VariableBinding':
    case 'AssignBinding':
    case 'DependencyBinding':
    case 'PropertyBinding':
    case 'ParameterBinding':
    case 'EnumPropertyBinding':
    case 'EnumBinding':
    case 'FunctionBinding':
    case 'ClassBinding':
    case 'ModuleBinding':
    case 'PackageBinding':
    case 'MacroBinding':
    case 'PropertyExpression':
    case 'CallExpression':
    case 'MacroCallExpression':
    case 'ReferenceExpression':
      return getNameFromAst(node.identifier);

    // 3. Формы (Shapes) с полем shapeIdentifier
    case 'MappedShape':
    case 'PropertyShape':
    case 'ReferenceShape':
    case 'AliasShapeBinding':
    case 'InterfaceShapeBinding':
      return getNameFromAst(node.shapeIdentifier);

    // 4. Онтология (Концепты и Клаузы)
    case 'PredicateConcept':
    case 'FactConcept':
    case 'PatternConceptExpression':
    case 'ActionClause':
      return getNameFromAst(node.predicate);

    case 'TaxonomyConcept':
      return getNameFromAst(node.subject);

    // 5. Фолбэк для легаси/нестандартных нод
    default:
      return node.name || '';
  }
}

export function getDescriptionFromAst(node: any): string {
  if (!node || typeof node !== 'object') return '';

  switch (node.kind) {
    // Узлы нового AST, где description хранится строго внутри поля meta
    case 'VariableStatement':
    case 'VariableBinding':
    case 'PropertyBinding':
    case 'ParameterBinding':
    case 'EnumPropertyBinding':
    case 'EnumBinding':
    case 'FunctionBinding':
    case 'ClassBinding':
    case 'ModuleBinding':
    case 'PackageBinding':
    case 'PropertyShape':
    case 'AliasShapeBinding':
    case 'InterfaceShapeBinding':
    case 'ReturnShape':
      return node.meta?.description || '';

    // Если узел это обертка (например, ссылка или свойство),
    // рекурсивно пытаемся достать описание из её содержимого
    case 'PropertyExpression':
    case 'ReferenceExpression':
      return getDescriptionFromAst(node.expression || node.identifier);

    // Фолбэк для неизвестных или устаревших структур
    default:
      return node.meta?.description || node.description || '';
  }
}


export function createDefaultMeta(schemaNode: Schema): FormNodeMeta {

  return {
    errorMessage: null,
    isValidating: false,
    isDisabled: false,
    asyncValidate:  async ()=> '',
    isReadonly: false,
    // Учитываем новые поля shapeIdentifier и identifier
    name: getNameFromAst(schemaNode),
    description: getDescriptionFromAst(schemaNode),
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
