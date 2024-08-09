export function difference(oldText: string, newText: string) {
  const oldLines = oldText.match(/[^\r\n]*(?:\r?\n|$)/g) || [];
  const newLines = newText.match(/[^\r\n]*(?:\r?\n|$)/g) || []

  const diffResult = [] as { type: string, value: string, oldValue?: string }[];

  function ps({type, value, ...arfs}) {
    const last = diffResult.at(-1);
    if (last?.type === type) {
      last!.value! += value;
    } else {
      diffResult.push({type, value, ...arfs});
    }
  }

  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length) {
      if (oldLines[i] === newLines[j]) {
        ps({type: 'unchanged', value: oldLines[i]});
        i++;
        j++;
      } else {
        // Look for the next matching line in newLines
        let k = j;
        while (k < newLines.length && oldLines[i] !== newLines[k]) {
          k++;
        }

        if (k < newLines.length) {
          // New line found, handle additions
          if (j < k) {
            for (let l = j; l < k; l++) {
              ps({type: 'added', value: newLines[l]});
            }
          }
          ps({type: 'changed', oldValue: oldLines[i], value: newLines[k]});
          i++;
          j = k + 1;
        } else {
          ps({type: 'removed', value: oldLines[i]});
          i++;
        }
      }
    } else if (i < oldLines.length) {
      ps({type: 'removed', value: oldLines[i]});
      i++;
    } else if (j < newLines.length) {
      ps({type: 'added', value: newLines[j]});
      j++;
    }
  }

  return diffResult;
}
