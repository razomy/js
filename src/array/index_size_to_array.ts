import {create_array} from 'razomy.js/array/create_array';

export function index_size_to_array(ix: number, size: number): number[] {
  const arr = create_array(size);
  arr[ix] = 1;
  return arr;
}