import * as abstracts from "@razomy/abstracts";

export type Null = null;
export type Undefined = undefined;
export type Bool = boolean;
export type SymbolType = symbol;

// Целые числа
export type I8 = abstracts.meta.Brand<number, 'I8'>;
export type I16 = abstracts.meta.Brand<number, 'I16'>;
export type I32 = abstracts.meta.Brand<number, 'I32'>;
export type I64 = abstracts.meta.Brand<bigint, 'I64'>;
export type I128 = abstracts.meta.Brand<bigint, 'I128'>;
export type Int = I32;
export type IntPrimitive = I8 | I16 | I32 | I64 | I128 | Int;

// Беззнаковые целые числа
export type U8 = abstracts.meta.Brand<number, 'U8'>;
export type U16 = abstracts.meta.Brand<number, 'U16'>;
export type U32 = abstracts.meta.Brand<number, 'U32'>;
export type U64 = abstracts.meta.Brand<bigint, 'U64'>;
export type U128 = abstracts.meta.Brand<bigint, 'U128'>;
export type UIntPrimitive = U8 | U16 | U32 | U64 | U128;

// Числа с плавающей точкой
export type F32 = abstracts.meta.Brand<number, 'F32'>;
export type F64 = abstracts.meta.Brand<number, 'F64'>;
export type Float = F32;
export type FloatPrimitive = F32 | F64 | Float;

export type Number = number;
export type NumberPrimitive = IntPrimitive | UIntPrimitive | FloatPrimitive | Number;

// Строки
export type Char = abstracts.meta.Brand<string, 'Char'>;
export type InlineString = string;
export type FixedString = string;
export type MultilineString = string;
export type String = string;
export type StringPrimitive = Char | InlineString | MultilineString | FixedString | String;

export type EnumInt = number;
export type EnumString = string;

export type AllPrimitives = StringPrimitive | NumberPrimitive | Bool | Null | Undefined | SymbolType;
