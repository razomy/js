import type {Dict} from './dict';

export function get<T extends Dict<any>>(dict: T, attr: keyof T) {
  return dict[attr]
}