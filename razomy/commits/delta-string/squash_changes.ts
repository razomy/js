import * as commits from "@razomy/commits";

export function squashChanges(
  changes: commits.deltaString.DeltaString[],
): commits.deltaString.DeltaString[] {
  if (changes.length === 0) {
    return [];
  }

  let lastAdd: commits.deltaString.AddDeltaString | undefined = undefined;
  let lastRemove: commits.deltaString.RemoveDeltaString | undefined = undefined;
  let last = changes[0];
  let posSshit = 1;
  const next: commits.deltaString.DeltaString[] = [changes[0]];
  for (let i = 1; i < changes.length; i++) {
    const current = changes[i];

    if ('addValue' in current) {
      if (lastAdd === undefined) {
        lastAdd = last = current;
        posSshit = 1;
        next.push(last);
        continue;
      }

      if (lastAdd.offset + lastAdd.addValue.length + posSshit === current.offset) {
        lastAdd.addValue += current.addValue;
        posSshit += 1;
        continue;
      }
      lastAdd = last = current;
      next.push(last);
      posSshit = 1;
    } else if ('removeLength' in current) {
      if (lastRemove === undefined) {
        lastRemove = last = current;
        next.push(last);
        posSshit = 1;
        continue;
      }

      if (lastAdd === undefined) {
        continue;
      }

      if (lastRemove.offset + lastAdd.addValue.length + posSshit === current.offset) {
        lastRemove.removeLength += current.removeLength;
        continue;
      }
      lastRemove = last = current;
      posSshit = 1;
      next.push(last);
    }
  }

  return next;
}
