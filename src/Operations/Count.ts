export function Count(str: string, c: string) {
  var result = 0, i = 0;
  for (i; i < str.length; i++) if (str[i] == c) result++;
  return result;
}
