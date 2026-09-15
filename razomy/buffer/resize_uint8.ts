export function resizeUint8(arr: Uint8Array, newSize: number): Uint8Array {
  const newArr = new Uint8Array(newSize);
  newArr.set(arr);
  return newArr;
}
