import {to_formatted_string} from './to_formatted_string';
import {object_to_bytes} from './object_to_bytes';

export function object_to_formatted_string(obj: unknown): string {
  const size_in_bytes = object_to_bytes(obj);
  const formatted_size = to_formatted_string(size_in_bytes);
  return formatted_size;
}
