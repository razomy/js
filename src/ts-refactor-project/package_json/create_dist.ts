import fs from 'node:fs';
import path from 'node:path';

// 1. Хелперы трансформации
function clean (t: string) { return t.replace('src/', ''); }
function ext (e: string) { return (t: string) => clean(t).replace(/\.ts$/, e); }

const js = ext('.js');
const dts = ext('.d.ts');
const cjs = ext('.cjs');
const mjs = ext('.mjs');
const dmts = ext('.d.mts');
const dcts = ext('.d.cts');

// 2. Плоский список правил по путям (от более конкретных к общим)
const pathRules: [string, (v: string) => string][] = [
  ['default.default', js],
  ['default.types', dts],

  ['import.default', js],
  ['import.types', dts],

  ['node.import', mjs],
  ['node.require', cjs],
  ['node.types', dmts],

  ['./node.import', mjs],
  ['./node.require', cjs],
  ['./node.types', dmts],

  ['require.default', cjs],
  ['require.types', dcts],

  ['import', js],
  ['require', cjs],
  ['types', dts],
];

// 3. Правила по самому значению файла (если путь нестандартный, например "./package.json")
const valueRules: [RegExp, (v: string) => string][] = [
  [/\.(json|wasm|svg|css)$|\/\*$/, clean],
  [/\.ts$/, dmts],
];

function transformTree(node: any, currentPath = ''): any {
  if (!node) return node;

  // Если массив (например, в typesVersions: { "*": { ".": ["./src/index.ts"] } })
  // индекс в путь не добавляем, чтобы путь оставался чистым
  if (Array.isArray(node)) {
    return node.map((item) => transformTree(item, currentPath));
  }

  // Если объект — рекурсивно идем вглубь, склеивая путь через точку
  if (typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [
        k,
        transformTree(v, currentPath ? `${currentPath}.${k}` : k),
      ]),
    );
  }

  // Если дошли до строки — ищем правило
  if (typeof node === 'string') {
    // Особый случай для typesVersions
    if (currentPath.startsWith('typesVersions')) {
      if (node.endsWith('/*')) return node;
      if (node.endsWith('.ts')) return dmts(node);
    }

    // 1. Ищем совпадение по пути (например "exports...require.types" совпадет с "require.types")
    const pathRule = pathRules.find(
      ([pattern]) => currentPath === pattern || currentPath.endsWith(`${pattern}`),
    );
    if (pathRule) return pathRule[1](node);

    // 2. Ищем совпадение по значению (расширению файла)
    const valRule = valueRules.find(([regex]) => regex.test(node));
    if (valRule) return valRule[1](node);

    throw new Error(`Unknown path "${currentPath}" with value "${node}"`);
  }

  return node;
}

export function createDist(packageDirPath: string) {
  const jsonPath = path.join(packageDirPath, './package.json');
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  if (pkg.files) pkg.files = ['*'];
  if (pkg.scripts) pkg.scripts = {};

  if (pkg.main) pkg.main = js(pkg.main);
  if (pkg.module) pkg.module = mjs(pkg.module);
  if (pkg.types) pkg.types = dcts(pkg.types);
  if (pkg.exports) pkg.exports = transformTree(pkg.exports, 'exports');
  if (pkg.typesVersions) pkg.typesVersions = transformTree(pkg.typesVersions, 'typesVersions');

  let res = JSON.stringify(pkg, null, 2);

  // WORKAROUND: nuxt not compile child import.ts
  if (pkg.name?.includes('nuxt')) {
    res = res.replaceAll('/index.d.mts', '/index.d.ts').replaceAll('/index.mjs', '/index.js');
  }

  fs.writeFileSync(path.join(packageDirPath, 'dist/package.json'), res);
  fs.copyFileSync(
    path.resolve(packageDirPath, '../../LICENSE'),
    path.resolve(packageDirPath, 'dist/LICENSE'),
  );
}
