import * as json from '@razomy/json';

export function getValueFromDiff(diff: json.DiffEntry): any {
  if (diff.type === 'CREATED') {
    return diff.newValue;
  }

  if (diff.type === 'UPDATED') {
    return diff.newValue;
  }

  if (diff.type === 'DELETED') {
    return undefined;
  }

  if (diff.type === 'NESTED_UPDATE') {
    return Object.fromEntries(Object.keys(diff.children).map((k) => [k, getValueFromDiff(diff.children[k])]));
  }

  throw new Error(`Unknown diff type provided`);
}
