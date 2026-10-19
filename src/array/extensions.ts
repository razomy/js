// AUTO-GENERATED PROTOTYPE FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as array from '@razomy/array';

// --- RUNTIME BINDINGS ---
for (const key of Object.getOwnPropertyNames(array.ArrayExtension.prototype)) {
  if (key !== 'constructor' && !(key in Array.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(array.ArrayExtension.prototype, key);
    if (descriptor) {
      Object.defineProperty(Array.prototype, key, descriptor);
    }
  }
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface Array<T> extends array.ArrayExtension {}
}

export {};
