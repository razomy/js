import { AddDeltaString, DeltaString, RemoveDeltaString } from 'razomy.commit/datetime/delta/string/delta_string';

export default function squash_changes(changes: DeltaString[]): DeltaString[] {
    if (changes.length === 0) {
    return [];
    }

    let last_add: AddDeltaString | undefined = undefined;
    let last_remove: RemoveDeltaString | undefined = undefined;
    let last = changes[0];
    let pos_sshit = 1;
    const next: DeltaString[] = [changes[0]];
    for (let i = 1; i < changes.length; i++) {
    const current = changes[i];

    if ('add_value' in current) {
      if (last_add === undefined) {
        last_add = last = current;
        pos_sshit = 1;
        next.push(last)
        continue;
      }

      if (last_add.offset + last_add.add_value.length + pos_sshit === current.offset) {
        last_add.add_value += current.add_value;
        pos_sshit += 1;
        continue;
      }
      last_add = last = current;
      next.push(last)
      pos_sshit = 1;
    } else if ('remove_length' in current) {
      if (last_remove === undefined) {
        last_remove = last = current;
        next.push(last)
        pos_sshit = 1;
        continue;
      }

      if (last_add === undefined) {
        continue;
      }

      if (last_remove.offset + last_add.add_value.length + pos_sshit === current.offset) {
        last_remove.remove_length += current.remove_length;
        continue;
      }
      last_remove = last = current;
      pos_sshit = 1;
      next.push(last)
    }
    }

    return next;
}
