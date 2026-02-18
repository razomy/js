export type null_ = null;

export type bool = true | false;

export type i8 = number;
export type i16 = number;
export type i32 = number;
export type i64 = bigint;
export type i128 = bigint;
export type int = i32;

export type u8 = number;
export type u16 = number;
export type u32 = number;
export type u64 = bigint;
export type u128 = bigint;

export type f32 = number;
export type f64 = number;
export type float = f32;

export type char = string;
export type lineString = string;
export type myltilineString = string;

export type enumInt = number[];
export type enumString = string[];

export type OtherPrimitive = bool | null_;
export type IntPrimitive = i8 | i16 | i32 | i64 | i128 | int;
export type UIntPrimitive = u8 | u16 | u32 | u64 | u128;
export type FloatPrimitive = f32 | f64 | float;
export type NumberPrimitive = IntPrimitive | UIntPrimitive | FloatPrimitive | enumInt;
export type StringPrimitive = char | lineString | myltilineString | enumString;
export type AllPrimitive = NumberPrimitive | StringPrimitive | OtherPrimitive;
