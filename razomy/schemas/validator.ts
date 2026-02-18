export type Trowable<T> = void;
export type Validator<TV, TO, T = any> = (value: TV, options: TO) => Trowable<T>;
export type Transformer<TF, TT> = {
  encode: (from: TF) => TT
  decode: (encoded: TT) => TF
}
