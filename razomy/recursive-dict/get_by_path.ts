// Helper function to get a value from a nested path
export function get(obj, path: string) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}
