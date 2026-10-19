// AUTO-GENERATED PROTOTYPE FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as stringCase from '@razomy/string-case';

// --- RUNTIME BINDINGS ---
for (const key of Object.getOwnPropertyNames(stringCase.StringCaseExtension.prototype)) {
  if (key !== 'constructor' && !(key in String.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(stringCase.StringCaseExtension.prototype, key);
    if (descriptor) {
      Object.defineProperty(String.prototype, key, descriptor);
    }
  }
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface String extends stringCase.StringCaseExtension {}
}

export {};
