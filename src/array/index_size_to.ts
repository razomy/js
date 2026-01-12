import create from 'razomy/array/create';

function index_size_to(ix: number, size: number): number[] {
  const arr = create(size);
  arr[ix] = 1;
  return arr;
}

export default index_size_to;
