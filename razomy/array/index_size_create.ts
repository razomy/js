import {create} from 'razomy.array/create';

export function indexSizeCreate(ix: number, size: number): number[] {
  const arr = create(size);
  arr[ix] = 1;
  return arr;
}


