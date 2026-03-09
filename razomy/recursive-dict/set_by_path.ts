export function set(obj, path: string, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}; // Create nested object if it doesn't exist
    }
    current = current[key];
  }

  current[lastKey!] = value;
}
