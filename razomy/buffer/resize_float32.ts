export function resizeFloat32(arr: Float32Array, newSize: number): Float32Array {
  const newArr = new Float32Array(newSize);
  newArr.set(arr);
  return newArr;
}
