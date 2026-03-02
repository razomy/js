// Helper function to get a value from a nested path
export function getByPath(obj, path: string) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Helper function to set a value at a nested path
// Helper function to delete a value at a nested path
export function deleteByPath(obj, path: string) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  for (const key of keys) {
    if (!current[key]) return; // Stop if path doesn't exist
    current = current[key];
  }
  delete current[lastKey!];
}
