// --- TYPES & INTERFACES ---

export type PlainObject = Record<string, any>;

// Function to check if an item is an object (Acts as a TS Type Guard)
export function isObject(val: unknown): val is PlainObject {
  return Boolean(val) && typeof val === 'object' && !Array.isArray(val);
}

// Recursive function to deeply merge objects
