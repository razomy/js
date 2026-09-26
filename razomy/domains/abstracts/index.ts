// Imports
import { boolDefault } from './bool_default';
import { createAt } from './create_at';
import { deletedAt } from './deleted_at';
import { id } from './id';
import { intDefault } from './int_default';
import { onDeleteCascade } from './on_delete_cascade';
import type { Cascade } from './on_delete_cascade';
import { stringDefault } from './string_default';
import { updateAt } from './update_at';

// Named exports
export {
  boolDefault,
  createAt,
  deletedAt,
  id,
  intDefault,
  onDeleteCascade,
  stringDefault,
  updateAt
};
export type {
  Cascade
};

// Default export
const abstracts = {
  boolDefault,
  createAt,
  deletedAt,
  id,
  intDefault,
  onDeleteCascade,
  stringDefault,
  updateAt,
};


export default abstracts;
