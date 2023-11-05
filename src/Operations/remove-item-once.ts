
export function removeItemOnce(arr: any[], value: any): any[] {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
