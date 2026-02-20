import type {ActorDatetimeDeltaString} from './addss_to_string';

export function findRepetitions(arr: ActorDatetimeDeltaString[]) {
  const frequencyMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = 0; j < item.deltas.length; j++) {
      const change = item.deltas[j];
      if ('addValue' in change) {
        if (frequencyMap.has(change.addValue)) {
          frequencyMap.set(change.addValue, frequencyMap.get(change.addValue) + 1);
        } else {
          frequencyMap.set(change.addValue, 1);
        }
      }

    }
  }

  const repetitiveItems = Array.from(frequencyMap.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);
  const repetitions: string[] = [];
  repetitiveItems.forEach(([item, count]) => {
    repetitions.push(count + '_' + item);
  });
  return repetitions;
}
