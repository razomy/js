import {ActorDatetimeDeltaString} from './adds';

export default function find_repetitions(arr: ActorDatetimeDeltaString[]) {
    const frequency_map = new Map();
    for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = 0; j < item.deltas.length; j++) {
      const change = item.deltas[j];
      if ('add_value' in change) {
        if (frequency_map.has(change.add_value)) {
          frequency_map.set(change.add_value, frequency_map.get(change.add_value) + 1);
        } else {
          frequency_map.set(change.add_value, 1);
        }
      }

    }
    }

    const repetitive_items = Array.from(frequency_map.entries())
            .filter(([, count]) => count > 1)
            .sort((a, b) => b[1] - a[1]);
    const repetitions: string[] = [];
    repetitive_items.forEach(([item, count]) => {
    repetitions.push(count + '_' + item);
    });
    return repetitions;
}
