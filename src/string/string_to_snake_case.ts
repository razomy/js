export function string_to_snake_case(string: string) {
  return string
    .split(/ |-|\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
}
