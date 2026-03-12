import * as shell from "@razomy/shell";
import * as difference from "@razomy/difference";
import * as index from "@razomy/index";

/** a was, b become */
export function differences<T>(a: T[], b: T[], sum: (...as: T[]) => T) {
  const diffs = [] as difference.Difference<T>[];
  let last: difference.Difference<T> | null = null;

  function addDiff(type: difference.DifferenceType, value: T) {
    if (last?.type === type) {
      last.value = sum(last.value, value);
    } else {
      last = { type, value };
      diffs.push(last);
    }
  }

  let aI = 0;
  let bI = 0;

  while (aI < a.length && bI < b.length) {
    shell.progress(bI, b.length);
    if (a[aI] === b[bI]) {
      addDiff('unchanged', a[aI]);
      aI++;
      bI++;
    } else {
      let [nAi, nBi] = index.firstEqualIndexes(a, b, aI, bI);

      if (aI < nAi) {
        addDiff('removed', sum(...a.slice(aI, nAi)));
        aI = nAi;
      }

      if (bI < nBi) {
        addDiff('added', sum(...b.slice(bI, nBi)));
        bI = nBi;
      }
    }
  }

  if (aI < a.length) {
    addDiff('removed', sum(...a.slice(aI)));
  } else if (bI < b.length) {
    addDiff('added', sum(...b.slice(bI)));
  }

  return diffs;
}
