export function string_to_snake_case(string: string) {
  return string
    .split(/ |-|\B(?=[A-Z]{1:}+)/)
    .map(word => word.toLowerCase())
    .join('_');
}
