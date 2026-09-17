export function resizeUint32Fill(arr: Uint32Array, newSize: number, oldSize: number, fillVal: number): Uint32Array {
  const newArr = new Uint32Array(newSize);
  newArr.set(arr);
  newArr.fill(fillVal, oldSize, newSize);
  return newArr;
}
