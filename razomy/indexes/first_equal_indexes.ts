/** first index */
export function firstEqualIndexes<T>(
  a: T[],
  b: T[],
  startA = 0,
  startB = 0
) {
  let aIndex = a.length;
  let bIndex = b.length;
  let potentialIndex = aIndex + bIndex;
  let aMax = Math.min(a.length, potentialIndex);
  let bMax = Math.min(b.length, potentialIndex);

  for (let aI = startA; aI < aMax; aI++) {
    for (let bI = startB; bI < bMax; bI++) {
      let potential = aI + bI;
      if (potential > potentialIndex) {
        break;
      }
      if (a[aI] !== b[bI]) {
        continue;
      }
      if (potential < potentialIndex) {
        aIndex = aI;
        bIndex = bI;
        potentialIndex = potential;
        aMax = Math.min(a.length, potentialIndex);
        bMax = Math.min(b.length, potentialIndex);
      }
    }
  }
  return [aIndex, bIndex];
}


