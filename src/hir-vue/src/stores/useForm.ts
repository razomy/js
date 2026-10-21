import { inject, reactive, ref } from 'vue';
import type { FormNodeMeta, SchemaType } from './types';

import { defaultFormKey, defaultTypeMap } from './constants';
import {
  buildSchemaRegistry,
  createDefaultMeta,
  getByPath,
  getSchemaByPath,
  getTypeByHirNode,
  initFormData,
  setByPath,
} from './functions';
import type { PathArray } from '@razomy/abstractions/path';

// ==========================================
// ВЫНЕСЕННЫЕ ЧИСТЫЕ ФУНКЦИИ ЛОГИКИ
// ==========================================

export async function processAsyncValidation(
  val: any,
  path: PathArray,
  fieldSchema: SchemaType,
  fieldMeta: FormNodeMeta,
  abortControllers: Map<string, AbortController>,
) {
  if (!fieldMeta?.asyncValidate) return;

  const pathStr = path.join('.');
  if (abortControllers.has(pathStr)) abortControllers.get(pathStr)!.abort();

  const controller = new AbortController();
  abortControllers.set(pathStr, controller);

  fieldMeta.isValidating = true;
  fieldMeta.errorMessage = null;

  try {
    const errorMsg = await fieldMeta.asyncValidate(val, controller.signal);
    if (!controller.signal.aborted) {
      fieldMeta.errorMessage = errorMsg || null;
    }
  } catch (e: any) {
    if (e.name !== 'AbortError') console.error(e);
  } finally {
    if (!controller.signal.aborted) fieldMeta.isValidating = false;
  }
}

// ==========================================
// VUE ХУК
// ==========================================

export interface Form {
  values: any;
  rules: Record<string, any>;
  rootSchemaState: { schema: SchemaType };
  meta: Record<string, FormNodeMeta>;
  setSchema: (...args: any) => any;
  setValue: (...args: any) => any;
  getValue: (...args: any) => any;
  getComponent: (...args: any) => any;
  getMeta: (...args: any) => any;
  getSchema: <T>(...args: any) => T;
  create: (...args: any) => any;
}

export function useForm(): Form {
  const values = ref<any>(null);
  const meta = reactive<Record<string, FormNodeMeta>>(null);
  const rules = reactive<Record<string, any>>({});

  const abortControllers = new Map<string, AbortController>();
  const rootSchemaState = reactive<{ schema: SchemaType }>({ schema: null });
  const typeRegistry = new Map<string, any>();

  const create = (schema: SchemaType | null = null, defaultData: any = null, id: string = defaultFormKey) => {
    rootSchemaState.schema = schema;
    typeRegistry.clear();
    if (!schema) return;
    buildSchemaRegistry(schema, typeRegistry);
    initFormData(defaultData, schema, values, typeRegistry, []);
  };

  const getSchema = <T = SchemaType>(path: PathArray = []): T => {
    return getSchemaByPath<T>(rootSchemaState.schema!, path, typeRegistry);
  };

  const setSchema = (schema: SchemaType | null, path: PathArray = []) => {
    if (path.length === 0) {
      rootSchemaState.schema = schema;
      typeRegistry.clear();
      if (!schema) return;
      buildSchemaRegistry(schema, typeRegistry);
    }
  };

  const getMeta = (path: PathArray): FormNodeMeta => {
    let m = getByPath(meta, path);
    if (m === null) {
      const s = getSchema(path);
      m = createDefaultMeta(s);
    }
    return m;
  };

  const getValue = (path: PathArray = []) => {
    if (path.length === 0) return values.value;
    return getByPath(values.value, path);
  };

  const setValue = async (val: any, path: PathArray = []) => {
    if (path.length === 0) {
      values.value = val;
    } else {
      if (!values.value) {
        values.value = typeof path[0] === 'number' || !isNaN(Number(path[0])) ? [] : {};
      }
      setByPath(values.value, path, val);
    }

    let fieldMeta = getByPath(meta, path);
    if (!fieldMeta) {
      const s = getSchema(path);
      setByPath(meta, path, createDefaultMeta(s));
      fieldMeta = getByPath(meta, path);
    }

    const fieldSchema = getSchema(path) as any;
    await processAsyncValidation(val, path, fieldSchema, fieldMeta, abortControllers);
  };

  const getComponent = (path: PathArray) => {
    const s = getSchema(path);
    if (!s) return null;
    return defaultTypeMap[getTypeByHirNode(s)];
  };

  return {
    values,
    rules,
    rootSchemaState,
    meta,
    setSchema,
    setValue,
    getValue,
    getComponent,
    getMeta,
    create,
    getSchema,
  };
}

export const useFormInject = (id: string = defaultFormKey) => inject(id) as Form;
