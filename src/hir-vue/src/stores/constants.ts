import { type Component } from 'vue';

import String from '../components/input/String.vue';
import Number_ from '../components/input/Number.vue';
import Boolean from '../components/input/Boolean.vue';
import StringArray from '../components/input/StringArray.vue';
import NumberArray from '../components/input/NumberArray.vue';
import Date from '../components/input/Date.vue';
import Color from '../components/input/Color.vue';
import File from '../components/input/File.vue';
import JsonString from '../components/input/JsonString.vue';
import FileArray from '../components/input/FileArray.vue';
import Enum from '../components/input/Enum.vue';
import Object from '../components/adapter/Object.vue';
import Array from '../components/adapter/Array.vue';
import Tuple from '../components/adapter/Tuple.vue';
import Function from '../components/adapter/Function.vue';
import Union from '../components/adapter/Union.vue';
import Binding from '../components/adapter/Binding.vue';

export const defaultFormKey = 'form';

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
  'Union',
  'Object',
  'Array',
  'Tuple',
  'Binding',
  'Function',
] as const;

export type FormSupportedKind = (typeof FORM_SUPPORTED_BUILD_IN_KINDS)[number];

export const defaultTypeMap: Record<(typeof FORM_SUPPORTED_BUILD_IN_KINDS)[number], Component> = {
  String: String,
  Number: Number_,
  Boolean: Boolean,
  Function: Function,
  'Array<String>': StringArray,
  'Array<Number>': NumberArray,
  Date: Date,
  Color: Color,
  File: File,
  Union: Union,
  JsonString: JsonString,
  'Array<File>': FileArray,
  Enum: Enum,
  Object: Object,
  Array: Array,
  Tuple: Tuple,
  Binding: Binding,
} satisfies Record<FormSupportedKind, Component>;
