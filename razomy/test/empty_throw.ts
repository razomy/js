import  { not_empty,ArgumentError} from './argument_error';

export function empty_throw(value) {
  if (!not_empty(value)) {
    throw new ArgumentError(value);
  }

  return true;
}
