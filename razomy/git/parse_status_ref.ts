export function parseStatusRef(str: string) {
  const refs = {};
  const lines = str.length === 0 ? [] : str.split('\n');
  lines.forEach(function (str) {
    str = str.trim();
    if (str.length === 0) return;
    const parts = str.split(/\s+/);
    refs[parts[1]] = parts[0];
  });
  return refs;
}
