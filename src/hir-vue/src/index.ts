import Copy from './components/Copy.vue';
import Form from './components/Form.vue';

import Any from './components/adapter/Any.vue';
import Array from './components/adapter/Array.vue';
import Function from './components/adapter/Function.vue';
import Object from './components/adapter/Object.vue';
import Tuple from './components/adapter/Tuple.vue';
import Union from './components/adapter/Union.vue';
import Binding from './components/adapter/Binding.vue';

import Boolean from './components/input/Boolean.vue';
import Color from './components/input/Color.vue';
import Date from './components/input/Date.vue';
import Enum from './components/input/Enum.vue';
import File from './components/input/File.vue';
import FileArray from './components/input/FileArray.vue';
import JsonString from './components/input/JsonString.vue';
import Number from './components/input/Number.vue';
import NumberArray from './components/input/NumberArray.vue';
import String from './components/input/String.vue';
import StringArray from './components/input/StringArray.vue';

export * from "./stores/useFormModelValueAdapter"
export * from "./stores/useForm"
export * from "./stores/constants"
export * from "./stores/types"
export * from "./stores/functions"

export {
  Copy,
  Form,
  Any,
  Array,
  Object,
  Tuple,
  Boolean,
  Color,
  Date,
  Enum,
  File,
  Function,
  FileArray,
  JsonString,
  Number,
  Binding,
  Union,
  NumberArray,
  String,
  StringArray,
}

export default {
  install(app: any) {
    app.component('Copy', Copy);
    app.component('Any', Any);
    app.component('Array', Array);
    app.component('Object', Object);
    app.component('Tuple', Tuple);
    app.component('Binding', Binding);
    app.component('Form', Form);
    app.component('Boolean', Boolean);
    app.component('Color', Color);
    app.component('Function', Function);
    app.component('Date', Date);
    app.component('Union', Union);
    app.component('Enum', Enum);
    app.component('File', File);
    app.component('FileArray', FileArray);
    app.component('JsonString', JsonString);
    app.component('Number', Number);
    app.component('NumberArray', NumberArray);
    app.component('String', String);
    app.component('StringArray', StringArray);
  }
}

