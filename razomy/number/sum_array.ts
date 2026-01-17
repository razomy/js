export function sumArray(arr: any[], property: string): number {
  return arr.reduce((acc, obj) => acc + obj[property], 0);
}


