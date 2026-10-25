import type {PathArray} from "@razomy/abstractions/path";

export interface FormNodeMeta<O = any> {
  isValidating: boolean;
  isDisabled: boolean;
  isReadonly: boolean;
  name: string;
  description: string;
  options: O;
  errorMessage: string | null;
  asyncValidate: ((a: any, b: any) => Promise<string>) | null;
}

export interface FormNode<V = any, O = any> {
  path: PathArray;
  meta: FormNodeMeta<O>;
  modelValue: V;
}

export interface BoolProps extends FormNode {
  meta: FormNodeMeta<null>;
  modelValue: boolean;
}

export interface EnumOption {
  items: (string | number)[];
}

export interface EnumProps extends FormNode {
  meta: FormNodeMeta<EnumOption>;
  modelValue: string | number;
}

export interface ColorProps extends FormNode {
  modelValue: string;
}
export interface DateProps extends FormNode {
  modelValue: string;
}

export interface FileProps extends FormNode {
  modelValue: File;
}
export interface FileArrayProps extends FormNode {
  modelValue: File[];
}
export interface JsonStringProps extends FormNode {
  modelValue: string;
}
export interface NumberProps extends FormNode {
  modelValue: number;
}
export interface NumberArrayProps extends FormNode {
  modelValue: number[];
}
export interface StringProps extends FormNode {
  modelValue: string;
}
export interface StringArrayProps extends FormNode {
  modelValue: string[];
}
