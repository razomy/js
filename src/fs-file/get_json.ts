import fs from 'fs';

export function getJson<T = any>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
