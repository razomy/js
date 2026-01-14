export default function equal_(a, b) {
  if (a.equals(b)) return true;

  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }

  const keys_a = Object.keys(a);
  const keys_b = Object.keys(b);

  if (keys_a.length !== keys_b.length) return false;

  for (const key of keys_a) {
    if (!keys_b.includes(key) || !equal_(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
