import Copy from './components/Copy.vue';
import Any from './form/adapter/Any.vue';
import Array from './form/adapter/Array.vue';
import Object from './form/adapter/Object.vue';
import Tuple from './form/adapter/Tuple.vue';
import Form from './form/Form.vue';
import Boolean from './form/input/Boolean.vue';
import Color from './form/input/Color.vue';
import Date from './form/input/Date.vue';
import Enum from './form/input/Enum.vue';
import File from './form/input/File.vue';
import FileArray from './form/input/FileArray.vue';
import JsonString from './form/input/JsonString.vue';
import Number from './form/input/Number.vue';
import NumberArray from './form/input/NumberArray.vue';
import String from './form/input/String.vue';
import StringArray from './form/input/StringArray.vue';

export * from "./form/useFormModelValueAdapter"
export * from "./form/useForm"
export * from "./form/constants"

export {
  Copy,
  Any,
  Array,
  Object,
  Tuple,
  Form,
  Boolean,
  Color,
  Date,
  Enum,
  File,
  FileArray,
  JsonString,
  Number,
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
    app.component('Form', Form);
    app.component('Boolean', Boolean);
    app.component('Color', Color);
    app.component('Date', Date);
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

