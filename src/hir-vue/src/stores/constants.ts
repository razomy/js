import { type Component } from 'vue';

import {String} from '@razomy/vue';
import {Number} from '@razomy/vue';
import {Boolean} from '@razomy/vue';
import {StringArray} from '@razomy/vue';
import {NumberArray} from '@razomy/vue';
import {Date} from '@razomy/vue';
import {Color} from '@razomy/vue';
import {File} from '@razomy/vue';
import {JsonString} from '@razomy/vue';
import {FileArray} from '@razomy/vue';
import { Enum } from '@razomy/vue';
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
  Number: Number,
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
