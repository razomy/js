// scripts/build-package.js
import fs from 'node:fs';
import path from 'node:path';
import {type Dict, mapDict} from '@razomy/dict';
import {isObject} from '@razomy/object';
import * as array from '@razomy/array';

export function createDist(path_) {

  const jsonPath = path.join(path_, './package.json');
// Read root package.json
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  function cj(t: string) {
    return t.replace('.ts', '.cjs').replace('src/', '');
  }

  function mj(t: string) {
    return t.replace('.ts', '.mjs').replace('src/', '');
  }

  function dmj(t: string) {
    return t.replace('.ts', '.d.mts').replace('src/', '');
  }

  function dcj(t: string) {
    return t.replace('.ts', '.d.cts').replace('src/', '');
  }

  function mD(v1: Dict<string> | string | undefined, k2, k1 = '') {
    if (!v1) {
      return v1;
    }
    if (array.isArray(v1)) {
      return array.map(v1, (v2, k3) => mD(v2, k3, k2));
    }
    if (isObject(v1)) {
      return mapDict(v1, (v2, k3) => mD(v2, k3, k2));
    }
    if (k2 === 'vue' && k1 === 'types') return dmj(v1);
    if (k2 === 'browser' && k1 === 'types') return dmj(v1);
    if (k2 === 'default' && k1 === 'types') return dmj(v1);
    if (k2 === 'types') return dmj(v1);

    if (k2 === 'vue') return mj(v1);
    if (k2 === 'types') return mj(v1);
    if (k2 === 'browser') return mj(v1);

    if (k2 === 'default') return mj(v1);
    if (k2 === 'module') return mj(v1);
    if (k2 === 'node') return mj(v1);

    if (k2 === 'import') return mj(v1);
    if (k2 === 'main') return cj(v1);
    if (k2 === 'require') return cj(v1);
    if (v1.endsWith('/*')) return v1.replace('src/', '');
    if (v1.endsWith('.json')) return v1.replace('src/', '');
    if (v1.endsWith('.wasm')) return v1.replace('src/', '');
    if (v1.endsWith('.svg')) return v1.replace('src/', '');
    if (v1.endsWith('.ts')) return dmj(v1);
    throw new Error(`Unknown key "${k2}" "${k1}":"${v1}"`)
  }

  function mDt(v1: Dict<string> | string | undefined, k2, k1 = '') {
    if (!v1) {
      return v1;
    }
    if (array.isArray(v1)) {
      return array.map(v1, (v2, k3) => mDt(v2, k3, k2));
    }
    if (isObject(v1)) {
      return mapDict(v1, (v2, k3) => mDt(v2, k3, k2));
    }
    if (v1.endsWith('/*')) return v1;
    if (v1.endsWith('.ts')) return dmj(v1);
    throw new Error(`Unknown key "${k2}" "${k1}":"${v1}"`)
  }

  if (pkg.files) pkg.files = ['*'];
  if (pkg.main) pkg.main = mD(pkg.main, 'main');
  if (pkg.module) pkg.module = mD(pkg.module, 'module');
  if (pkg.types) pkg.types = dcj(pkg.types);
  if (pkg.scripts) pkg.scripts = {};
  if (pkg.exports) pkg.exports = mD(pkg.exports, 'exports');
  if (pkg.typesVersions) pkg.typesVersions = mDt(pkg.typesVersions, 'typesVersions');

  let res  = JSON.stringify(pkg, null, 2);
  // WORKAROUND: nuxt not comple child import.ts
  const isNuxt = pkg.name.includes('nuxt');
  if(isNuxt){
    res = res.replaceAll('/index.d.mts', '/index.d.ts')
      .replaceAll('/index.mjs', '/index.js')
  }

  fs.writeFileSync(path.join(path_, 'dist/package.json'), res);
  fs.copyFileSync(path.resolve(path_, '../../LICENSE'), path.resolve(path_, 'dist/LICENSE'));
}
