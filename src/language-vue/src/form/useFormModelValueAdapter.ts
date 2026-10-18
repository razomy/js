import {watch} from 'vue';
import type {Schema} from "./constants";
import type {Form} from "./useForm";

export interface FormSyncProps {
  isLoading: boolean;
  isReadonly: boolean;
  modelValue: any;
  schema: Schema | null;
}

export function useFormModelValueAdapter(props: FormSyncProps, emit: any, form: Form): Form {
  watch(
    () => props.schema,
    (schema) => form.setSchema(schema),
    {immediate: true} // Ensures it runs on component mount
  );

  // 2. Sync External Data (modelValue) -> Internal Form State
  watch(
    () => props.modelValue,
    (newModelValue) => {
      const currentCleanData = form.getValue();
      if (JSON.stringify(newModelValue) !== JSON.stringify(currentCleanData)) {
        form.setValue(newModelValue);
      }
    },
    {deep: true}
  );

  // 3. Sync Internal Form State -> External Data (emit update)
  watch(
    () => form.values,
    () => {
      const cleanData = form.getValue();
      if (JSON.stringify(cleanData) !== JSON.stringify(props.modelValue)) {
        emit('update:modelValue', cleanData);
      }
    },
    {deep: true}
  );

  form.create(props.schema, props.modelValue);

  return form;
}
