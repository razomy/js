export function isEqual<T>(arr1: T[], arr2: T[]) {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
}

export function toggleArrayElement<T>(arr: T[], element: T): T[] {
  const index = arr.indexOf(element);

  if (index === -1) {
    // Element not found - Add it (returns a new array)
    return [...arr, element];
  } else {
    // Element found - Remove the first occurrence (returns a new array)
    return [
      ...arr.slice(0, index), // Elements before the found element
      ...arr.slice(index + 1), // Elements after the found element
    ];
  }
}
