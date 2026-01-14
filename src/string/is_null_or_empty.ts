export default function is_null_or_empty(
  str: string | null | undefined,
): str is null | undefined | '' {
  return str == null || str.trim() === '';
}
