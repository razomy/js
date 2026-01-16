export function sum_array(arr: any[], property: string): number {
  return arr.reduce((acc, obj) => acc + obj[property], 0);
}


