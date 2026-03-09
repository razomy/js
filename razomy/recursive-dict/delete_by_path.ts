export function delete_(obj, path: string) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  for (const key of keys) {
    if (!current[key]) return; // Stop if path doesn't exist
    current = current[key];
  }

  delete current[lastKey!];
}
