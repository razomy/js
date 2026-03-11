import type {Brand} from './ts_workarounds';

export type Null = null;
export type Undefined = undefined;
export type Bool = boolean;
export type SymbolType = symbol;

// Целые числа
export type I8 = Brand<number, 'I8'>;
export type I16 = Brand<number, 'I16'>;
export type I32 = Brand<number, 'I32'>;
export type I64 = Brand<bigint, 'I64'>;
export type I128 = Brand<bigint, 'I128'>;
export type Int = I32;
export type IntPrimitive = I8 | I16 | I32 | I64 | I128 | Int;

// Беззнаковые целые числа
export type U8 = Brand<number, 'U8'>;
export type U16 = Brand<number, 'U16'>;
export type U32 = Brand<number, 'U32'>;
export type U64 = Brand<bigint, 'U64'>;
export type U128 = Brand<bigint, 'U128'>;
export type UIntPrimitive = U8 | U16 | U32 | U64 | U128;

// Числа с плавающей точкой
export type F32 = Brand<number, 'F32'>;
export type F64 = Brand<number, 'F64'>;
export type Float = F32;
export type FloatPrimitive = F32 | F64 | Float;

export type NumberPrimitive = IntPrimitive | UIntPrimitive | FloatPrimitive;

// Строки
export type Char = Brand<string, 'Char'>;
export type InlineString = string;
export type FixedString = string;
export type MultilineString = string;
export type StringPrimitive = Char | InlineString | MultilineString | FixedString;

export type EnumInt = number;
export type EnumString = string;

export type AllPrimitives = StringPrimitive | NumberPrimitive | Bool | Null | Undefined | SymbolType;

