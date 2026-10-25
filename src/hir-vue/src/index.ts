import Form from './components/Form.vue';

import Any from './components/adapter/Any.vue';
import Array from './components/adapter/Array.vue';
import Function from './components/adapter/Function.vue';
import Object from './components/adapter/Object.vue';
import Tuple from './components/adapter/Tuple.vue';
import Union from './components/adapter/Union.vue';
import Binding from './components/adapter/Binding.vue';

export * from "./stores/useFormModelValueAdapter"
export * from "./stores/useForm"
export * from "./stores/constants"
export * from "./stores/types"
export * from "./stores/functions"

export {
  Form,
  Any,
  Array,
  Object,
  Tuple,
  Function,
  Binding,
  Union,
}

export default {
  install(app: any) {
    app.component('Any', Any);
    app.component('Array', Array);
    app.component('Object', Object);
    app.component('Tuple', Tuple);
    app.component('Binding', Binding);
    app.component('Form', Form);
    app.component('Function', Function);
    app.component('Union', Union);
  }
}
