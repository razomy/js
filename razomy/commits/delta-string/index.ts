// Imports
import { addssToString } from './addss_to_string';
import type { ActorDatetimeDeltaString } from './addss_to_string';
import type { AddDeltaString, DeltaString, RemoveDeltaString } from './delta_string';
import { deltaStringsToString } from './delta_strings_to_string';
import { findRepetitions } from './find_repetitions';
import { iterateCommit } from './iterate_commit';
import { mapCommit } from './map_commit';
import { removeDuplicatedChanges } from './remove_duplicated_changes';
import { squashChanges } from './squash_changes';
import { stringsToDeltaStrings } from './strings_to_delta_strings';

// Named exports
export {
  addssToString,
  deltaStringsToString,
  findRepetitions,
  iterateCommit,
  mapCommit,
  removeDuplicatedChanges,
  squashChanges,
  stringsToDeltaStrings
};
export type {
  ActorDatetimeDeltaString,
  AddDeltaString,
  DeltaString,
  RemoveDeltaString
};

// Default export
const deltaString = {
  addssToString,
  deltaStringsToString,
  findRepetitions,
  iterateCommit,
  mapCommit,
  removeDuplicatedChanges,
  squashChanges,
  stringsToDeltaStrings,
};


export default deltaString;
