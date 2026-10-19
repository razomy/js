// AUTO-GENERATED PROTOTYPE FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as string from '@razomy/string';

// --- RUNTIME BINDINGS ---
for (const key of Object.getOwnPropertyNames(string.StringExtension.prototype)) {
  if (key !== 'constructor' && !(key in String.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(string.StringExtension.prototype, key);
    if (descriptor) {
      Object.defineProperty(String.prototype, key, descriptor);
    }
  }
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface String extends string.StringExtension {}
}

export {};
