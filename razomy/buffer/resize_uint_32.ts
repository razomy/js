export function resizeUint32(arr: Uint32Array, newSize: number): Uint32Array {
  const newArr = new Uint32Array(newSize);
  newArr.set(arr);
  return newArr;
}
