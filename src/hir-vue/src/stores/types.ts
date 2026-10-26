import type { HirnType, OperatorHirn, VarRefHirn, StructHirn } from '@razomy/abstractions/hir';
import type { PathArray } from '@razomy/abstractions/path';

export interface FormNodeMeta<O = OptionType> {
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
  schema: SchemaType;
  modelValue: V;
}

export interface BoolProps extends FormNode {
  meta: FormNodeMeta<null>;
  schema: VarRefHirn;
  modelValue: boolean;
}

export interface EnumOption {
  items: (string | number)[];
}

export interface EnumProps extends FormNode {
  meta: FormNodeMeta<EnumOption>;
  schema: StructHirn;
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

export interface ArrayProps extends FormNode {
  modelValue: ValueType[];
}

export interface OperationProps extends FormNode {
  modelValue: ValueType[];
  schema: OperatorHirn;
}

export interface TupleProps extends FormNode {
  modelValue: ValueType[];
}

export interface ObjectProps extends FormNode {
  modelValue: Record<string, ValueType>;
}

export interface FunctionProps extends FormNode {
  modelValue: Record<string, ValueType>;
}

export type SchemaType = HirnType;
export type ValueType = string | number | boolean | Date | File | File[] | EnumOption | EnumProps;
export type OptionType = null | EnumOption;
export type PropsType =
  | BoolProps
  | EnumProps
  | ColorProps
  | DateProps
  | FileProps
  | FileArrayProps
  | JsonStringProps
  | NumberProps
  | NumberArrayProps
  | StringProps
  | StringArrayProps
  | ArrayProps
  | TupleProps
  | ObjectProps
  | FunctionProps;
