export function isArray(array: any[] | any): array is [] {
  return Array.isArray(array);
}