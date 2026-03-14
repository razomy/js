export function chunk(text: string, maxLength:number) {
  const result: string[] = [];
  for (let i = 0; i < text.length; i += maxLength) {
    result.push(text.slice(i, i + maxLength));
  }
  return result;
}

