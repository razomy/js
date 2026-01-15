export interface FunctionSpec<I extends Array<any>, O> {
  input: I,
  otput: O,
  error?: Error,
}
