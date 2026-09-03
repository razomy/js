import {type Component, inject, reactive, ref} from 'vue'
import {
  buildRegistry,
  createDefaultMeta,
  defaultFormKey,
  FORM_SUPPORTED_BUILD_IN_KINDS,
  type FormNodeMeta,
  type FormSupportedKind,
  getByPath,
  getSchemaByPath,
  getTypeByAstNode,
  initFormData,
  type Path,
  type Schema,
  setByPath,
} from "./constants";

// ==========================================
// КОМПОНЕНТЫ И МАППИНГ
// ==========================================
import String from './input/String.vue';
import Number_ from './input/Number.vue';
import Boolean from './input/Boolean.vue';
import StringArray from './input/StringArray.vue';
import NumberArray from './input/NumberArray.vue';
import Date from './input/Date.vue';
import Color from './input/Color.vue';
import File from './input/File.vue';
import JsonString from "./input/JsonString.vue";
import FileArray from "./input/FileArray.vue";
import Enum from "./input/Enum.vue";
import Object from './adapter/Object.vue';
import Array from './adapter/Array.vue';
import Tuple from "./adapter/Tuple.vue";

const defaultTypeMap: Record<(typeof FORM_SUPPORTED_BUILD_IN_KINDS)[number], Component> = {
  'String': String,
  'Number': Number_,
  'Boolean': Boolean,
  'Array<String>': StringArray,
  'Array<Number>': NumberArray,
  'Date': Date,
  'Color': Color,
  'File': File,
  'JsonString': JsonString,
  'Array<File>': FileArray,
  'Enum': Enum,
  'Object': Object,
  'Array': Array,
  'Tuple': Tuple,
} satisfies Record<FormSupportedKind, Component>;

// ==========================================
// ВЫНЕСЕННЫЕ ЧИСТЫЕ ФУНКЦИИ ЛОГИКИ
// ==========================================

export async function processAsyncValidation(
  val: any,
  path: Path,
  fieldSchema: Schema,
  fieldMeta: FormNodeMeta,
  abortControllers: Map<string, AbortController>
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
  values: any,
  rules: any,
  schema: any,
  meta: any,
  setSchema: (...args: any) => any,
  setValue: (...args: any) => any,
  getValue: (...args: any) => any,
  getComponent: (...args: any) => any,
  getMeta: (...args: any) => any,
  getSchema: <T>(...args: any) => any,
  create: (...args: any) => any,
}

export function useForm(): Form {
  const values = ref<any>(null);
  const meta = reactive<Record<string, FormNodeMeta>>({});
  const rules = reactive<Record<string, any>>({});

  const abortControllers = new Map<string, AbortController>();
  const rootSchemaState = reactive<{ schema: Schema | null }>({schema: null});
  const typeRegistry = new Map<string, any>();

  const create = (schema: Schema | null = null, defaultData: any = null, id: string = defaultFormKey) => {
    rootSchemaState.schema = schema;
    typeRegistry.clear();
    if (!schema) return;
    buildRegistry(schema, typeRegistry);
    initFormData(defaultData, schema, values, typeRegistry, []);
  }

  const getSchema = <T = Schema>(path: Path = []): T => {
    return getSchemaByPath<T>(rootSchemaState.schema!, path, typeRegistry);
  }

  const setSchema = (schema: Schema | null, path: Path = []) => {
    if (path.length === 0) {
      rootSchemaState.schema = schema;
      typeRegistry.clear();
      if (!schema) return;
      buildRegistry(schema, typeRegistry);
    }
  }

  const getMeta = (path: Path): FormNodeMeta => {
    let m = getByPath(meta, path);
    if (!m) {
      const s = getSchema(path);
      m = createDefaultMeta(s);
    }
    return m;
  }

  const getValue = (path: Path = []) => {
    if (path.length === 0) return values.value;
    return getByPath(values.value, path);
  };

  const setValue = async (val: any, path: Path = []) => {
    if (path.length === 0) {
      values.value = val;
    } else {
      if (!values.value) {
        values.value = (typeof path[0] === 'number' || !isNaN(Number(path[0]))) ? [] : {};
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
  }

  const getComponent = (path: Path) => {
    const s = getSchema(path);
    if (!s) return null;
    return defaultTypeMap[getTypeByAstNode(s)];
  }

  return {
    values,
    rules,
    schema: rootSchemaState.schema,
    meta,
    setSchema,
    setValue,
    getValue,
    getComponent,
    getMeta,
    create,
    getSchema
  };
}

export const useFormInject = (id: string = defaultFormKey) => inject(id) as Form;
