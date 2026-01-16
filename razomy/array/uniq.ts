export function uniq(array) {
  const result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result;
}